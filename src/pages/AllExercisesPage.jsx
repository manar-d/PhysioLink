import { useNavigate } from "react-router";
import VideoBox from "../components/shared/VideoBox";
import useExercises from "../hooks/useExercises";
import { Box, Button, Typography } from "@mui/material";
import useHome from "../hooks/useHome";

export default function AllExercisesPage() {
  const { editExercise } = useExercises();
const { allExercises } = useHome();
  const navigate = useNavigate();

  const handleClick = () => {
    const testEdit = editExercise(1, { title: "testedite" });
    console.log(" editExercise ", testEdit);
  };
  return (
    <Box>
      <VideoBox />
      <Typography>All Exercises</Typography>
            {allExercises?.map((exercise) => (
        <Button
          key={exercise.id}
          onClick={() => navigate(`/exercises/${exercise.id}`)}
        >
          {exercise.title}
        </Button>
      ))}
      <Button onClick={handleClick}> check </Button>
    </Box>
  );
}
