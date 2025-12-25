import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  deleteExercise,
  getExercisesBySpecialist,
} from "../../db/exercises.service";

export default function ManageExercises() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const result = getExercisesBySpecialist(user.id);
    setExercises(result);
  }, [user.id]);

  const handleDelete = (exerciseId) => () => {
    if (
      window.confirm("Are you sure you want to delete this exercise?") &&
      deleteExercise(exerciseId)
    ) {
      const updated = getExercisesBySpecialist(user.id);
      setExercises(updated);
      alert("Exercise deleted successfully");
    }
  };

  return (
    <Box>
      {/*  Header  */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography fontWeight={600} sx={{ fontSize: 18 }}>
            My Exercises
          </Typography>

          <Typography color="text.secondary" sx={{ fontSize: 13 }}>
            Manage and organize your exercises
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/specialist/exercises/new")}
        >
          Add Exercise
        </Button>
      </Stack>

      {/*  Content  */}
      {exercises.length === 0 ? (
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          No exercises found. Please add some exercises.
        </Paper>
      ) : (
        <Stack spacing={2.5}>
          {exercises.map((exercise) => (
            <Paper
              key={exercise.id}
              sx={{
                p: 2.5,
                borderRadius: 3,
                transition: "0.2s",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
              >
                {/* Info */}
                <Box flex={1}>
                  <Typography
                    fontWeight={600}
                    sx={{ fontSize: 14 }}
                  >
                    {exercise.title}
                  </Typography>

                  {exercise.description && (
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: 13 }}
                    >
                      {exercise.description}
                    </Typography>
                  )}
                </Box>

                {/* Buttons */}
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() =>
                    navigate(
                      `/specialist/exercises/${exercise.id}/edit`
                    )
                  }
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  color="error"
                  onClick={handleDelete(exercise.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
