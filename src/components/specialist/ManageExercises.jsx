import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
import { ROLE_SPECIALIST } from "../../auth.constants";

export default function ManageExercises() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { exercises, removeExercise, loading } = useExercises();

  // Delete confirmation state
  const [openConfirm, setOpenConfirm] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);

    // Snackbar feedback
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success", // success | error
  });

    // Open delete confirmation dialog
  const handleOpenDelete = (id) => () => {
    setExerciseToDelete(id);
    setOpenConfirm(true);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    
    removeExercise(exerciseToDelete);

    setOpenConfirm(false);
    setExerciseToDelete(null);

    setSnack({
      open: true,
      message: t("ManageExercises.deletedSuccess"),
      severity: "success",
    });
  };

  // Loading state
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
      {/* Feedback message */}
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
            {t("ManageExercises.title")}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 13 }}>
            {t("ManageExercises.subtitle")}
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/specialist/exercises/new")}
        >
          {t("ManageExercises.addExercise")}
        </Button>
      </Stack>

      {/* Content */}
      <Stack spacing={2.5}>
        <ExerciseCard
          exercises={exercises}
          mode={ROLE_SPECIALIST}
          onDelete={handleOpenDelete}
        />
      </Stack>

      {/* Delete confirmation dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>
          {t("ManageExercises.deleteDialogTitle")}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {t("ManageExercises.deleteDialogMessage")}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>
            {t("ManageExercises.cancel")}
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            {t("ManageExercises.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}