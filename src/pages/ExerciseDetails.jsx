import { useEffect } from "react";
import { useParams } from "react-router";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Chip,
  Stack,
  Divider,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import VideoBox from "../components/shared/VideoBox";
import useExercises from "../hooks/useExercises";
import UnderConstructionPage from "../components/shared/UnderConstructionPage";


export default function ExerciseDetails() {
  const { id } = useParams();
  const exerciseId = id;

  const { selectedExercise, loadExerciseDetails, loading } = useExercises();

  useEffect(() => {
    if (!exerciseId) return;
    loadExerciseDetails(exerciseId);
  }, [exerciseId, loadExerciseDetails]);

  /* LOADING */
  if (loading || !selectedExercise) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
      <UnderConstructionPage pageName={`Exercise Details ${exerciseId} `} />
  );
}
