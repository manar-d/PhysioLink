import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  Checkbox,
} from "@mui/material";

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
  const { loadExerciseDetails, editExercise, error, loading } = useExercises();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(exercisesSchema),
    mode: "onTouched",
    defaultValues: {
      // title: "",
      // description: "",
      // image: "",
      // video: "",
      difficulty: "",
      categories: [],
    },
  });

  // Load exercise data
  useEffect(() => {
    const load = async () => {
      const exercise = await loadExerciseDetails(exerciseId);

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

      reset({
        title: exercise.title,
        description: exercise.description,
        image: exercise.image,
        video: exercise.video,
        difficulty: exercise.difficulty,
        categories: exercise.categories,
        duration: exercise.duration,
      });
    };
    load();
  }, [exerciseId]);

  // Submit
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

  // handle Cancel button
  const handleCancel = () => {
    navigate("/specialist");
  };

  return (
    <Container maxWidth="sm">
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

      {!error ? (
        <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Update Exercise
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Title */}
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            {/* Description */}
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

            {/* Image URL */}
            <TextField
              label="Image URL"
              fullWidth
              margin="normal"
              {...register("image")}
              error={!!errors.image}
              helperText={errors.image?.message}
            />

            {/* Video URL */}
            <TextField
              label="Video URL"
              fullWidth
              margin="normal"
              {...register("video")}
              error={!!errors.video}
              helperText={errors.video?.message}
            />

            {/* Difficulty */}
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.difficulty} sx={{ mt: 3 }}>
                  <FormLabel>Difficulty</FormLabel>
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="beginner"
                      control={<Radio />}
                      label="Beginner"
                    />
                    <FormControlLabel
                      value="intermediate"
                      control={<Radio />}
                      label="Intermediate"
                    />
                    <FormControlLabel
                      value="advanced"
                      control={<Radio />}
                      label="Advanced"
                    />
                  </RadioGroup>
                  <FormHelperText>{errors.difficulty?.message}</FormHelperText>
                </FormControl>
              )}
            />

            {/* Category */}
<Controller
  name="categories"
  control={control}
  render={({ field }) => (
    <FormControl error={!!errors.categories} sx={{ mt: 3 }}>
      <FormLabel>Category</FormLabel>

      <Stack direction="row">
        <FormControlLabel
          label="Knee"
          control={
            <Checkbox
              checked={field.value.includes("knee")}
              onChange={(e) => {
                if (e.target.checked) {
                  field.onChange([...field.value, "knee"]);
                } else {
                  field.onChange(
                    field.value.filter((v) => v !== "knee")
                  );
                }
              }}
            />
          }
        />

        <FormControlLabel
          label="Women"
          control={
            <Checkbox
              checked={field.value.includes("women")}
              onChange={(e) => {
                if (e.target.checked) {
                  field.onChange([...field.value, "women"]);
                } else {
                  field.onChange(
                    field.value.filter((v) => v !== "women")
                  );
                }
              }}
            />
          }
        />

        <FormControlLabel
          label="Sport"
          control={
            <Checkbox
              checked={field.value.includes("sport")}
              onChange={(e) => {
                if (e.target.checked) {
                  field.onChange([...field.value, "sport"]);
                } else {
                  field.onChange(
                    field.value.filter((v) => v !== "sport")
                  );
                }
              }}
            />
          }
        />
      </Stack>

      <FormHelperText>{errors.categories?.message}</FormHelperText>
    </FormControl>
  )}
/>
            {/* Duration */}      
            <TextField
              label="Duration (e.g., 15 minutes)"
              fullWidth
              margin="normal"
              {...register("duration")}
              error={!!errors.duration}
              helperText={errors.duration?.message}
            />

            {/* Submit Buttons */}
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Updating..." : "Update Exercise"}
              </Button>

              {/* Cancel Buttons */}
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
      ) : (
        <Typography variant="h3" sx={{ my: 5 }}>
          {error} !!
        </Typography>
      )}
    </Container>
  );
}
