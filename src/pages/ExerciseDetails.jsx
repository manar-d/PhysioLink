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
    <Box sx={{ bgcolor: "#f6f7fb", py: 5, minHeight: "100vh" }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="flex-start">
          {/* ================= LEFT ================= */}
          <Grid item xs={12} md={8} sx={{ border: "1px solid #da1313ff", }} >
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                position: "sticky",
                top: 32,
              }}
            > </Paper>
          </Grid>

          {/* ================= RIGHT  ================= */}
          <Grid item xs={12} md={4}sx={{ border: "1px solid #da1313ff", }}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                position: "sticky",
                top: 32,
              }}
            >
              <Typography
                sx={{
                  fontSize: 34,
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                {selectedExercise.title}
              </Typography>



              <Stack spacing={3}>

                {/* Difficulty */}
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">
                    Difficulty
                  </Typography>
                  <Chip
                    label={selectedExercise.difficulty}
                    variant="outlined"
                  />
                </Stack>

                <Divider />

                {/* Description */}
                <Box>
                  <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1 }}>
                    Description
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                    }}
                  >
                    {selectedExercise.description}
                  </Typography>
                </Box>

                {/* Edit */}
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<EditOutlinedIcon />}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 999,
                    fontWeight: 700,
                    width: "100%",
                  }}
                >
                  Edit Exercise
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
