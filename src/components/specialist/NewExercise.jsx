import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

import useAuth from "../../hooks/useAuth";
import useExercises from "../../hooks/useExercises";
import { exercisesSchema } from "../../schemas/exercises.schema";
import useExerciseFormLookups from "../../hooks/useExerciseFormLookups";
import useExerciseImage from "../../hooks/useExerciseImage";

export default function NewExercise() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { addExercise, loading } = useExercises();

  const { imageUrl, openWidget } = useExerciseImage();

  // Snackbar state
  const [snack, setSnack] = useState({
    open: false,
    message: "",
     severity: "success", // success | error
  });
  // Lookups
  const { difficulties, categories } = useExerciseFormLookups();

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
      video: "",
      difficultyId: null,
      categoryIds: [],
      duration: "",
      createdBy: null,
    },
  });

    // Set createdBy from authenticated user
  useEffect(() => {
    if (user?.id) {
      setValue("createdBy", user.id, { shouldValidate: false });
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      title: data.title.trim(),
      description: data.description.trim(),
      image:
        imageUrl ||
        "https://columbiaclinic.us/wp-content/uploads/2020/11/physical-therapy.jpg",
      video: data.video?.trim() || "https://www.youtube.com/embed/MT1iBQ1RZc4",
      difficultyId: data.difficultyId,
      categoryIds: data.categoryIds,
      duration: data.duration,
      createdBy: data.createdBy,
    };

    const result = await addExercise(payload);

    if (!result) {
      setSnack({
        open: true,
        message: t("NewExercise.createError"),
        severity: "error",
      });
      return;
    }

    setSnack({
      open: true,
      message: t("NewExercise.created"),
      severity: "success",
    });

    setTimeout(() => navigate("/specialist"), 2000);
  };

  const handleCancel = () => navigate("/specialist");

  return (
    <Container maxWidth="sm">
         {/* Feedback Message */}
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
          {t("NewExercise.addNew")}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Title */}
          <TextField
            label={t("NewExercise.title")}
            fullWidth
            margin="normal"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
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
            helperText={errors.description?.message}
          />

          {/* Upload Image */}
          <Box mt={2}>
            <Button type="button" variant="outlined" onClick={openWidget}>
              Upload Image
            </Button>

            {imageUrl && (
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  height: 220,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Box
                  component="img"
                  src={imageUrl}
                  alt="Exercise preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // ⭐ الأهم
                    display: "block",
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Video URL */}
          <TextField
            label={t("NewExercise.video")}
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
                <FormHelperText>{errors.difficultyId?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* Category */}
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
            label={t("NewExercise.duration")}
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
              {isSubmitting || loading
                ? t("Common.creating")
                : t("Common.create")}
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
