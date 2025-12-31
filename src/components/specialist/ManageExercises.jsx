import { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";

import useExercises from "../../hooks/useExercises";
import ExerciseCard from "../shared/ExerciseCard";

export default function ManageExercises() {
  const navigate = useNavigate();
  const { exercises, removeExercise, loading } = useExercises();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success", // success | error
  });

  const handleOpenDelete = (id) => () => {
    setExerciseToDelete(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    removeExercise(exerciseToDelete);
    setOpenConfirm(false);
    setExerciseToDelete(null);

    setSnack({
      open: true,
      message: "Exercise Deleted successfully",
      severity: "success",
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          mt: 10,
          display: "flex",
          alignItems: "center", // y
          justifyContent: "center", // x
        }}
      >
        <CircularProgress size={100} thickness={1} />
      </Box>
    );
  }

  return (
    <Box>
      {/* snackbar  */}

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>

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

      <Stack spacing={2.5}>
        <ExerciseCard
          exercises={exercises}
          mode={"specialist"}
          onDelete={handleOpenDelete}
        />
      </Stack>

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
