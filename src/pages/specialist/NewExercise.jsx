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
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { createExercise } from "../../db/exercises.service";
import { useNavigate } from "react-router-dom";

// Yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(60, "Title must be at most 60 characters"),

  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),

  difficulty: yup
    .string()
    .oneOf(
      ["Beginner", "Intermediate", "Advanced"],
      "Select a valid difficulty"
    )
    .required("Please select difficulty level"),

  category: yup
    .string()
    .oneOf(["Knee", "Women", "Sport"], "Select a valid category")
    .required("Please select category"),
});

export default function NewExercise() {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "",
      category: "",
      createdBy: null,
    },
  });

  const specialist = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    if (specialist?.id) {
      setValue("createdBy", specialist.id, { shouldValidate: false });
    }
  }, [specialist, setValue]);

  const onSubmit = (data) => {
    const payload = {
      title: data.title.trim(),//حذف الفراغات من البداية والنهاية
      description: data.description.trim(),
      difficulty: data.difficulty,
      category: data.category,
      createdBy: data.createdBy,
    };

    createExercise(payload);
    navigate("/specialist/exercises");
  };

  const handleCancel = () => {
    navigate("/specialist/exercises");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Add New Exercise
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
              {isSubmitting ? "Creating..." : "Create Exercise"}
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
