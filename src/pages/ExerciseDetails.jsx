import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Container, CircularProgress } from "@mui/material";

import useAuth from "../hooks/useAuth";
import useExercises from "../hooks/useExercises";
import usePatient from "../hooks/usePatient";
import useExerciseFormLookups from "../hooks/useExerciseFormLookups";

import ExerciseHeader from "../components/ExerciseDetails/ExerciseHeader";
import ExerciseStats from "../components/ExerciseDetails/ExerciseStats";
import ExerciseVideo from "../components/ExerciseDetails/ExerciseVideo";
import ExerciseNotes from "../components/ExerciseDetails/ExerciseNotes";
import ExerciseImage from "../components/ExerciseDetails/ExerciseImage";

import NotFoundPage from "./NotFoundPage";

import {
  EXERCISE_LOAD_MODE,
  ROLE_PATIENT,
  ROLE_SPECIALIST,
} from "../constants/auth.constants";

export default function ExerciseDetails() {
  const { id } = useParams();
  const { user, role } = useAuth();

  const { selectedExercise, loadExerciseDetails, loading, error } =
    useExercises();

  const { selectedExercise: patientSelectedExercise, getExerciseDetails } =
    usePatient();

  const { getLabel } = useExerciseFormLookups();

  const [difficultyLabel, setDifficultyLabel] = useState("-");
  const [categoryLabels, setCategoryLabels] = useState([]);

  // Roles
  const isPatient = role === ROLE_PATIENT;
  const isSpecialist = role === ROLE_SPECIALIST;

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      // Public data
      await loadExerciseDetails(id, EXERCISE_LOAD_MODE.PUBLIC);

      // Patient
      if (isPatient && user?.id) {
        await getExerciseDetails(id);
      }
    };
    loadData();
  }, [id, isPatient, user?.id]);

  useEffect(() => {
    if (!selectedExercise) return;

    const loadLabels = async () => {
      setDifficultyLabel(
        await getLabel("difficulties", selectedExercise.difficultyId),
      );

      setCategoryLabels(
        await getLabel("categories", selectedExercise.categoryIds),
      );
    };

    loadLabels();
  }, [selectedExercise]);

  if (loading) {
    return (
      <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    // exercise not found
    return <NotFoundPage />;
  }

  if (!selectedExercise) return null;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Header */}
        <ExerciseHeader
          exercise={selectedExercise}
          isSpecialist={isSpecialist}
          categories={categoryLabels}
        />

        {/* Stats */}
        <ExerciseStats
          duration={selectedExercise.duration}
          difficulty={difficultyLabel}
        />

        {/*  Video Guide */}
        {selectedExercise.video && (
          <ExerciseVideo video={selectedExercise.video} />
        )}

        {/*  Specialist notes (PATIENT ONLY)  */}
        {isPatient && patientSelectedExercise && (
          <ExerciseNotes notes={patientSelectedExercise.notes || ""} />
        )}

        {/*  image + image  Preview Dialog*/}
        {selectedExercise.image && (
          <ExerciseImage image={selectedExercise.image} />
        )}
      </Container>
    </Box>
  );
}
