import { useEffect } from "react";
import { useParams } from "react-router";
import VideoBox from "../components/shared/VideoBox";
import useExercises from "../hooks/useExercises";
import { Divider, Typography } from "@mui/material";

export default function ExerciseDetails() {
  const { id } = useParams();
  const exerciseId = Number(id);

  const { selectedExercise, loadExerciseDetails, loading } = useExercises();

  useEffect(() => {
    if (!exerciseId) return;
    loadExerciseDetails(exerciseId);
  }, [exerciseId]);

  if (loading || !selectedExercise) {
    return <p>Loading exercise...</p>;
  }

  return (
    <>
      <Typography variant="h3">{selectedExercise.title}</Typography>
      <VideoBox url={selectedExercise.videoUrl} />
    </>
  );
}