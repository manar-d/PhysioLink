import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Paper,
  Container,
  Alert,
  IconButton,
  MenuItem,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useLocale from "../../hooks/useLocale";

import useExercises from "../../hooks/useExercises";
import usePatientExercises from "../../hooks/usePatientExercises";
import useAuth from "../../hooks/useAuth";
import { assignExercisesSchema } from "../../schemas/assignExercises.schema";

export default function AssignExercises() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { t } = useLocale();

  const { user } = useAuth();
  const { exercises } = useExercises();
  const { assignExercise, loading, error } = usePatientExercises();

  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [formError, setFormError] = useState("");

  //Snackbar
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success", // success | error
  });

  const selectedExercise = exercises.find(
    (e) => String(e.id) === String(selectedExerciseId),
  );

  const isAlreadyAdded = assignedExercises.some(
    (x) => x.exerciseId === selectedExercise?.id,
  );

  const handleAdd = () => {
    if (!selectedExercise || isAlreadyAdded) return;

    setAssignedExercises((prev) => [
      ...prev,
      { exerciseId: selectedExercise.id, notes: "" },
    ]);

    setSelectedExerciseId("");
    setFormError("");
  };

  const handleUpdateNotes = (index, value) => {
    setAssignedExercises((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], notes: value };
      return copy;
    });
  };

  const handleRemove = (index) => {
    setAssignedExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      //simple validation
      await assignExercisesSchema.validate(
        { exercises: assignedExercises },
        { abortEarly: false },
      );

      for (const item of assignedExercises) {
        await assignExercise({
          patientId,
          exerciseId: item.exerciseId,
          specialistId: user.id,
          notes: item.notes,
        });
      }

      // Feedback success
      setSnack({
        open: true,
        message: t("AssignExercises.savedSuccess"),
        severity: "success",
      });

      setTimeout(() => navigate("/specialist"), 1500);
    } catch (e) {
      setFormError(e.errors?.[0] || t("AssignExercises.atLeastOneExercise"));
    }
  };

  return (
    <Container maxWidth="sm">
      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>

      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          {t("AssignExercises.title")}
        </Typography>

        {(error || formError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || formError}
          </Alert>
        )}

        {/* Select exercise */}
        <TextField
          select
          label={t("AssignExercises.chooseExercise")}
          fullWidth
          value={selectedExerciseId}
          onChange={(e) => setSelectedExerciseId(e.target.value)}
        >
          {loading ? (
            <MenuItem disabled>{t("Common.loading")}</MenuItem>
          ) : exercises.length === 0 ? (
            <MenuItem disabled>{t("AssignExercises.empty")}</MenuItem>
          ) : (
            exercises.map((ex) => (
              <MenuItem key={ex.id} value={String(ex.id)}>
                {ex.title}
              </MenuItem>
            ))
          )}
        </TextField>

        {selectedExercise && (
          <Box
            mt={2}
            p={2}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              backgroundColor: "background.default",
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" mb={0.5}>
              {t("AssignExercises.exerciseDetails")}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {selectedExercise.description}
            </Typography>
          </Box>
        )}

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          startIcon={<AddIcon />}
          disabled={!selectedExercise || isAlreadyAdded}
          onClick={handleAdd}
        >
          {t("AssignExercises.addToPlan")}
        </Button>

        {/* Assigned exercises */}
        <Stack spacing={2} mt={4}>
          {assignedExercises.length === 0 ? (
            <Typography color="text.secondary">
              {t("AssignExercises.empty")}
            </Typography>
          ) : (
            assignedExercises.map((item, index) => {
              const ex = exercises.find((e) => e.id === item.exerciseId);

              return (
                <Box
                  key={`${item.exerciseId}-${index}`}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Stack spacing={1.5}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight="bold">{ex?.title}</Typography>

                      <IconButton
                        color="error"
                        onClick={() => handleRemove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>

                    <TextField
                      label={t("AssignExercises.notes")}
                      multiline
                      rows={2}
                      fullWidth
                      value={item.notes}
                      onChange={(e) => handleUpdateNotes(index, e.target.value)}
                    />
                  </Stack>
                </Box>
              );
            })
          )}
        </Stack>

        {/* Actions */}
        <Stack direction="row" spacing={2} mt={4}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/specialist")}
          >
            {t("Common.cancel")}
          </Button>

          <Button
            variant="contained"
            fullWidth
            disabled={assignedExercises.length === 0 || loading}
            onClick={handleSave}
          >
            {loading ? t("Common.saving") : t("AssignExercises.savePlan")}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
