import VideoBox from "../components/shared/VideoBox";
import useExercises from "../hooks/useExercises";
import { Box, Button, Typography } from "@mui/material";

export default function AllExercises() {
  const { editExercise } = useExercises();

  const handleClick = () => {
    const testEdit = editExercise(1, { title: "testedite" });
    console.log(" editExercise ", testEdit);
  };
  return (
    <Box>
      <VideoBox />
      <Typography>All Exercises</Typography>
      <Button onClick={handleClick}> check </Button>
    </Box>
  );
}
