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
import useExerciseFormLookups from "../../hooks/useExerciseFormLookups";
import useExerciseImage from "../../hooks/useExerciseImage";
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

  const { difficulties, categories } = useExerciseFormLookups();

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
      title: "",
      description: "",
      image: "",
      video: "",
      difficultyId: null,
      categoryIds: [],
      duration: "",
    },
  });

  const [initialImage, setInitialImage] = useState("");

  // Exercise Image Upload
  const { imageUrl, openWidget } = useExerciseImage(initialImage);

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

        setTimeout(() => navigate("/specialist"), 2000);
        return;
      }

      reset({
        title: exercise.title,
        description: exercise.description,
        video: exercise.video,
        difficultyId: exercise.difficultyId,
        categoryIds: exercise.categoryIds || [],
        duration: exercise.duration,
      });

      setInitialImage(exercise.image);
    };

    load();
  }, [exerciseId]);

  // Submit
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      image: imageUrl || initialImage, // use existing image if not changed
    };

    await editExercise(exerciseId, payload);

    setSnack({
      open: true,
      message: "Exercise updated successfully",
      severity: "success",
    });

    setTimeout(() => navigate("/specialist"), 2000);
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

            {/* Image Preview */}
            {(imageUrl || initialImage) && (
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  height: 220,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  component="img"
                  src={imageUrl || initialImage}
                  alt="preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}

            <Button variant="outlined" sx={{ mt: 2 }} onClick={openWidget}>
              Change Image
            </Button>


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
              name="difficultyId"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.difficultyId} sx={{ mt: 3 }}>
                  <FormLabel>Difficulty</FormLabel>

                  <RadioGroup
                    row
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    {difficulties.map((d) => (
                      <FormControlLabel
                        key={d.id}
                        value={d.id}
                        control={<Radio />}
                        label={d.key}
                      />
                    ))}
                  </RadioGroup>

                  <FormHelperText>
                    {errors.difficultyId?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            {/* Category */}
            <Controller
              name="categoryIds"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.categoryIds} sx={{ mt: 3 }}>
                  <FormLabel>Category</FormLabel>

                  <Stack direction="row">
                    {categories.map((c) => (
                      <FormControlLabel
                        key={c.id}
                        label={c.key}
                        control={
                          <Checkbox
                            checked={field.value.includes(c.id)}
                            onChange={(e) =>
                              e.target.checked
                                ? field.onChange([...field.value, c.id])
                                : field.onChange(
                                    field.value.filter((v) => v !== c.id)
                                  )
                            }
                          />
                        }
                      />
                    ))}
                  </Stack>
                  <FormHelperText>{errors.categoryIds?.message}</FormHelperText>
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
