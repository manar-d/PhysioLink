import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import {
  Box,
  Typography,
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  FormHelperText,
  TextField,
  Paper,
  Container,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

// React Hook Form + Yup
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useExercises from "../../hooks/useExercises";
import { exercisesSchema } from "../../schemas/exercises.schema";

export default function EditExercise() {
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success", // success | error
  });

  const { id } = useParams();
  const exerciseId = id;
  const navigate = useNavigate();
  const { getExerciseById, editExercise } = useExercises();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(exercisesSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      difficulty: "",
      category: "",
    },
  });

  useEffect(() => {
    const exercise = getExerciseById(exerciseId);

    if (!exercise) {
      setSnack({
        open: true,
        message: "Exercise not found",
        severity: "error",
      });

      setTimeout(() => {
        navigate("/specialist");
      }, 2000);

      return;
    }

    setValue("title", exercise.title);
    setValue("description", exercise.description);
    setValue("difficulty", exercise.difficulty);
    setValue("category", exercise.category);
  }, []);

  const onSubmit = (data) => {
    editExercise(exerciseId, data);

    setSnack({
      open: true,
      message: "Exercise updated successfully",
      severity: "success",
    });

    setTimeout(() => {
      navigate("/specialist");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/specialist/exercises");
  };

  return (
    <Container maxWidth="sm">
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

      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Update Exercise
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.difficulty} sx={{ mt: 3 }}>
                <FormLabel>Difficulty</FormLabel>
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="Beginner"
                    control={<Radio />}
                    label="Beginner"
                  />
                  <FormControlLabel
                    value="Intermediate"
                    control={<Radio />}
                    label="Intermediate"
                  />
                  <FormControlLabel
                    value="Advanced"
                    control={<Radio />}
                    label="Advanced"
                  />
                </RadioGroup>
                <FormHelperText>{errors.difficulty?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.category} sx={{ mt: 3 }}>
                <FormLabel>Category</FormLabel>
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="Knee"
                    control={<Radio />}
                    label="Knee"
                  />
                  <FormControlLabel
                    value="Women"
                    control={<Radio />}
                    label="Women"
                  />
                  <FormControlLabel
                    value="Sport"
                    control={<Radio />}
                    label="Sport"
                  />
                </RadioGroup>
                <FormHelperText>{errors.category?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* Buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Exercise"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
