import { useEffect } from "react";
import { useParams } from "react-router";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";

import useExercises from "../hooks/useExercises";
import UnderConstructionPage from "../components/shared/UnderConstructionPage";

export default function ExerciseDetails() {
  const { id } = useParams();
  const exerciseId = id;

  const { selectedExercise, loadExerciseDetails, loading, error } =
    useExercises();

  useEffect(() => {
    if (exerciseId) loadExerciseDetails(exerciseId);
  }, [exerciseId]);

  return (
    <>
      {/* LOADING */}
      {loading && (
        <Box>
          <CircularProgress />
        </Box>
      )}

      {/* ERROR */}
      {!loading && error && (
        <Typography color="error" variant="h6" >
          {error}
        </Typography>
      )}

      {/* SUCCESS */}
      {!loading && !error && selectedExercise && (
        <>
        <Typography variant="h6" gutterBottom>
          Exercise title - {selectedExercise.title}
        </Typography>
        <UnderConstructionPage pageName={`Exercise Details ${exerciseId}`} />
        </>
      )}
    </>
  );
}
