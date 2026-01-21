import { useEffect } from "react";
import { useParams } from "react-router";
import { Box, Container, Typography, CircularProgress } from "@mui/material";

import useExercises from "../hooks/useExercises";
import useAuth from "../hooks/useAuth";

//page
import useExerciseFormLookups from "../hooks/useExerciseFormLookups";
import usePatient from "../hooks/usePatient";
import ExerciseStats from "../components/ExerciseDetails/ExerciseStats";
import ExerciseVideo from "../components/ExerciseDetails/ExerciseVideo";
import ExerciseNotes from "../components/ExerciseDetails/ExerciseNotes";
import ExerciseImage from "../components/ExerciseDetails/ExerciseImage";
import ExerciseHeader from "../components/ExerciseDetails/ExerciseHeader";

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
  const { difficulties, categories } = useExerciseFormLookups();

  const { patientSelectedExercise, getExerciseDetails } = usePatient();

  //TODO:move logic
  const difficultyLabel =
    difficulties.find((d) => d.id === selectedExercise?.difficultyId)?.key ||
    "-";

  const categoryLabels =
    categories
      .filter((c) => selectedExercise?.categoryIds?.includes(c.id))
      .map((c) => c.key) || []; //["","",""]

  const isSpecialist = role === ROLE_SPECIALIST;
  const isPatient = role === ROLE_PATIENT;

  useEffect(() => {
    const loadData = async (exerciseId, userId) => {
      if (id) loadExerciseDetails(exerciseId, EXERCISE_LOAD_MODE.PUBLIC);
      if (id) getExerciseDetails(exerciseId, userId);
    };

    loadData(id, user?.id);
  }, [id, user?.id]);

  if (loading)
    return (
      <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (error) {
    // exercise not found
    return <NotFoundPage  />;
  }

  if (!selectedExercise) return null;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/*  HEADER  */}
        <ExerciseHeader
          exercise={selectedExercise}
          isSpecialist={isSpecialist}
          categories={categoryLabels}
        />

        {/*  STATS  */}
        <ExerciseStats
          duration={selectedExercise.duration}
          difficulty={difficultyLabel}
        />

        {/*  VIDEO GUIDE  */}
        {selectedExercise.video && (
          <ExerciseVideo video={selectedExercise.video} />
        )}

        {/*  SPECIALIST NOTES (PATIENT ONLY)  */}
        {isPatient && patientSelectedExercise?.notes && (
          <ExerciseNotes notes={patientSelectedExercise?.notes} />
        )}

        {/*  IMAGE  */}
        {/*  PREVIEW DIALO */}
        {selectedExercise.image && (
          <ExerciseImage image={selectedExercise.image} />
        )}
      </Container>
    </Box>
  );
}
