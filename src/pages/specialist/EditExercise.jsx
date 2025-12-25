import { useEffect } from "react";
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
  Stack
} from "@mui/material";

// React Hook Form + Yup
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// DB
import {
  getDetailsExercisesBySpecialist,
  updateExercise,
} from "../../db/exercises.service";

/* 
   Validation Schema
 */
const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  difficulty: yup.string().required("Difficulty is required"),
  category: yup.string().required("Category is required"),
});

export default function EditExercise() {
  const { id } = useParams();
  const exerciseId = id;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      difficulty: "",
      category: "",
    },
  });

 
  useEffect(() => {
    const exercise =
      getDetailsExercisesBySpecialist(exerciseId);

    if (!exercise) {
      alert("Exercise not found");
      navigate("/specialist");
      return;
    }

    setValue("title", exercise.title);
    setValue("description", exercise.description);
    setValue("difficulty", exercise.difficulty);
    setValue("category", exercise.category);
  }, [exerciseId, setValue, navigate]);


  const onSubmit = (data) => {
    updateExercise(exerciseId, data);
    navigate("/specialist");
  };

    const handleCancel = () => {
    navigate("/specialist/exercises");
  };
  
  return (
    <Container maxWidth="sm">
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
