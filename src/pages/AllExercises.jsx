import React from "react";
import VideoBox from "../components/shared/VideoBox";
import useExercises from "../hooks/useExercises";
import { Button } from "@mui/material";

export default function AllExercises() {
  const { editExercise } = useExercises();

  const handlclick = () => {
    const testEdit = editExercise(1, { category: "testedite" });
    console.log(" editExercise ", testEdit);
  };
  return (
    <div>
      <VideoBox />
      <h3>All Exercises</h3>
      <Button onClick={handlclick}> check </Button>
    </div>
  );
}
