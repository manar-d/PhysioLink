import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useLocale from "../../hooks/useLocale";

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
import useLookups from "../../hooks/useLookups";
import useExerciseImage from "../../hooks/useExerciseImage";
import { exercisesSchema } from "../../schemas/exercises.schema";
import { EXERCISE_LOAD_MODE } from "../../constants/auth.constants";

export default function EditExercise() {
  const { t } = useLocale();
  const { id: exerciseId } = useParams();
  const navigate = useNavigate();

  const { loadExerciseDetails, editExercise, error, loading } = useExercises();
  const { difficulties, categories } = useLookups();

  const [initialImage, setInitialImage] = useState("");
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
      duration: null,
    },
  });

  // Exercise Image Upload
  const { imageUrl, openWidget } = useExerciseImage(initialImage);

  // Load exercise data
  useEffect(() => {
    const load = async () => {
      const exercise = await loadExerciseDetails(
        exerciseId,
        EXERCISE_LOAD_MODE.EDIT,
      );

      if (!exercise) {
        setSnack({
          open: true,
          message: t("EditExercise.notFound"),
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
        createdBy: exercise.createdBy,
      });

      setInitialImage(exercise.image);
    };

    load();
  }, [exerciseId]);

    // Guards

  if (error === "UNAUTHORIZED") {
    return <Navigate to="/unauthorized" replace />;
  }

  if (error === "NOT_FOUND") {
    setSnack({
      open: true,
      message: t("EditExercise.notfound"),
      severity: "error",
    });

    setTimeout(() => navigate("/specialist"), 2000);

    return;
  }
  
  // Submit
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      image: imageUrl || initialImage, // use existing image if not changed
    };

 const updated = await editExercise(exerciseId, payload);

    if (!updated) {
      setSnack({
        open: true,
        message: t(`error.${error}`) || t("EditExercise.notfound"),
        severity: "error",
      });

      setTimeout(() => navigate("/specialist"), 2000);

      return;
    }

    setSnack({
      open: true,
      message: t("EditExercise.updatedSuccess"),
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

        <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            {t("EditExercise.title")}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Title */}
            <TextField
              label={t("NewExercise.title")}
              fullWidth
              margin="normal"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title && t(`yup.${errors.title.message}`)}
            />

            {/* Description */}
            <TextField
              label={t("NewExercise.description")}
              fullWidth
              multiline
              rows={3}
              margin="normal"
              {...register("description")}
              error={!!errors.description}
              helperText={
                errors.description && t(`yup.${errors.description.message}`)
              }
            />

            {/* Image Preview */}
            {(imageUrl || initialImage) && (
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  height: {
                    xs: 180,
                    sm: 220,
                    md: 260,
                  },
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  component="img"
                  src={imageUrl || initialImage}
                  alt={t("EditExercise.imagePreviewAlt")}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
            <Button variant="outlined" sx={{ mt: 2 }} onClick={openWidget}>
              {t("EditExercise.changeImage")}
            </Button>

            {/* Video URL */}
            <TextField
              label={t("NewExercise.video")}
              fullWidth
              margin="normal"
              {...register("video")}
              error={!!errors.video}
              helperText={errors.video && t(`yup.${errors.video.message}`)}
            />

            {/* Difficulty */}
            <Controller
              name="difficultyId"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.difficultyId} sx={{ mt: 3 }}>
                  <FormLabel>{t("NewExercise.difficulty")}</FormLabel>

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
                        label={t(`difficulty.${d.key}`)}
                      />
                    ))}
                  </RadioGroup>

                  <FormHelperText>
                    {errors.difficultyId &&
                      t(`yup.${errors.difficultyId.message}`)}
                  </FormHelperText>
                </FormControl>
              )}
            />

            {/* Categories */}
            <Controller
              name="categoryIds"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.categoryIds} sx={{ mt: 3 }}>
                  <FormLabel>{t("NewExercise.category")}</FormLabel>

                  <Stack direction="row">
                    {categories.map((c) => (
                      <FormControlLabel
                        key={c.id}
                        label={t(`category.${c.key}`)}
                        control={
                          <Checkbox
                            checked={field.value.includes(c.id)}
                            onChange={(e) =>
                              e.target.checked
                                ? field.onChange([...field.value, c.id])
                                : field.onChange(
                                    field.value.filter((v) => v !== c.id),
                                  )
                            }
                          />
                        }
                      />
                    ))}
                  </Stack>

                  <FormHelperText>
                    {errors.categoryIds && t(`yup.${errors.categoryIds.message}`)}
                  </FormHelperText>
                </FormControl>
              )}
            />

            {/* Duration */}
            <TextField
              label={t("NewExercise.duration")}
              type="number"
              fullWidth
              margin="normal"
              {...register("duration")}
              error={!!errors.duration}
              helperText={errors.duration && t(`yup.${errors.duration.message}`)}
            />

            {/* Action Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading
                  ? t("Common.updating")
                  : t("EditExercise.update")}
              </Button>

              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                {t("Common.cancel")}
              </Button>
            </Stack>
          </Box>
        </Paper>
    </Container>
  );
}