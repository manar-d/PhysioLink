import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuth from "../../hooks/useAuth";
import useExercises from "../../hooks/useExercises";
import { exercisesSchema } from "../../schemas/exercises.schema";

export default function NewExercise() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addExercise, loading } = useExercises();

  // Snackbar state
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success", // success | error
  });

  // Form configuration
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(exercisesSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      video: "",
      difficulty: "",
      category: "",
      createdBy: null,
    },
  });

  // Set createdBy from authenticated user
  useEffect(() => {
    if (user?.id) {
      setValue("createdBy", user.id, { shouldValidate: false }); //update the value without validation
    }
  }, [user, setValue]);

  // Submit
  const onSubmit = async (data) => {
    const payload = {
      title: data.title.trim(), // remove leading and trailing spaces
      description: data.description.trim(),
      image:
        data.image?.trim() ||
        "https://columbiaclinic.us/wp-content/uploads/2020/11/physical-therapy.jpg",
      video: data.video?.trim() || "https://www.youtube.com/embed/MT1iBQ1RZc4",
      difficulty: data.difficulty,
      category: data.category,
      createdBy: data.createdBy,
    };

    const result = await addExercise(payload);

    if (!result) {
      setSnack({
        open: true,
        message: "Failed to create exercise",
        severity: "error",
      });
      return;
    }

    setSnack({
      open: true,
      message: "Exercise created successfully",
      severity: "success",
    });

    setTimeout(() => navigate("/specialist"), 2000);
  };

  const handleCancel = () => {
    navigate("/specialist");
  };

  return (
    <Container maxWidth="sm">
      {/* Feedback Message*/}
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
          Add New Exercise
        </Typography>

        {/* Title */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.category} sx={{ mt: 3 }}>
                <FormLabel>Category</FormLabel>
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="knee"
                    control={<Radio />}
                    label="Knee"
                  />
                  <FormControlLabel
                    value="women"
                    control={<Radio />}
                    label="Women"
                  />
                  <FormControlLabel
                    value="sport"
                    control={<Radio />}
                    label="Sport"
                  />
                </RadioGroup>
                <FormHelperText>{errors.category?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* Submit Buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? "Creating..." : "Create Exercise"}
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
    </Container>
  );
}
