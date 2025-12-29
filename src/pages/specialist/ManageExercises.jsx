import { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useExercises from "../../hoocks/useExercises";
import ExerciseCard from "../patient/ExerciseCard";

export default function ManageExercises() {
  const navigate = useNavigate();
  const { exercises, removeExercise, loading } = useExercises();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);

  const handleOpenDelete = (id) => () => {
    setExerciseToDelete(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    removeExercise(exerciseToDelete);
    setOpenConfirm(false);
    setExerciseToDelete(null);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography fontWeight={600} sx={{ fontSize: 18 }}>
            My Exercises
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 13 }}>
            Manage and organize your exercises
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/specialist/exercises/new")}
        >
          Add Exercise
        </Button>
      </Stack>

      {/* Content */}
      {exercises.length === 0 ? (
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          No exercises found. Please add some exercises.
        </Paper>
      ) : (
        <Stack spacing={2.5}>
          <ExerciseCard
            exercises={exercises}
            mode={"specialist"}
            onDelete={handleOpenDelete}
          />
        </Stack>
      )}

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Delete Exercise</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this exercise?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
