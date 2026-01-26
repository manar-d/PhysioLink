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
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useLocale from "../../hooks/useLocale";
import useExercises from "../../hooks/useExercises";
import usePatientExercises from "../../hooks/usePatientExercises";
import useAuth from "../../hooks/useAuth";
import { assignExercisesSchema } from "../../schemas/assignExercises.schema";

export default function AssignExercises() {
  const { id: patientId } = useParams();
  const navigate = useNavigate();
  const { t } = useLocale();

  const { user } = useAuth();
  const { exercises } = useExercises();
  const { assignExercise, loading, error } = usePatientExercises();

  // Snackbar
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(assignExercisesSchema),
    defaultValues: {
      selectedExerciseId: "",
      exercises: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const selectedExerciseId = watch("selectedExerciseId");
  const assignedExercises = watch("exercises");

  const selectedExercise = exercises.find(
    (e) => String(e.id) === String(selectedExerciseId),
  );

  const isAlreadyAdded = assignedExercises.some(
    (x) => x.exerciseId === selectedExercise?.id,
  );

  const handleAdd = () => {
    if (!selectedExercise || isAlreadyAdded) return;

    append({
      exerciseId: selectedExercise.id,
      notes: "",
    });

    setValue("selectedExerciseId", "");
  };

  const onSubmit = async (data) => {
    if (!user?.id) return;

    try {
      for (let index = 0; index < data.exercises.length; index++) {
        const item = data.exercises[index];

        const result = await assignExercise({
          patientId,
          exerciseId: item.exerciseId,
          specialistId: user.id,
          notes: item.notes,
        });

        if (!result) {
          setError(`exercises.${index}.exerciseId`, {
            type: "server",
            message: t(`error.${error}`),
          });
          return;
        }
      }

      // Feedback success
      setSnack({
        open: true,
        message: t("AssignExercises.savedSuccess"),
        severity: "success",
      });

      setTimeout(() => navigate("/specialist"), 1500);
    } finally {
      //handle error in hook
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

        {(error || errors?.exercises) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {t(`error.${error}`) ||
              errors.exercises?.message ||
              t("AssignExercises.atLeastOneExercise")}
          </Alert>
        )}

        {/* Select exercise */}
        <Controller
          name="selectedExerciseId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label={t("AssignExercises.chooseExercise")}
              fullWidth
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
          )}
        />

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
          {fields.length === 0 ? (
            <Typography color="text.secondary">
              {t("AssignExercises.empty")}
            </Typography>
          ) : (
            fields.map((item, index) => {
              const ex = exercises.find((e) => e.id === item.exerciseId);

              return (
                <Box
                  key={item.id}
                  sx={{
                    border: "1px solid",
                    borderColor: errors.exercises?.[index]?.exerciseId
                      ? "red"
                      : "divider",
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

                      <IconButton color="error" onClick={() => remove(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>

                    <Controller
                      name={`exercises.${index}.notes`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={t("AssignExercises.notes")}
                          multiline
                          rows={2}
                          fullWidth
                        />
                      )}
                    />
                  </Stack>
                </Box>
              );
            })
          )}
        </Stack>

        {/* Actions */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 4 }}
        >
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
            disabled={fields.length === 0 || loading}
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? t("Common.saving") : t("AssignExercises.savePlan")}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
