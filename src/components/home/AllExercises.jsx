import React from "react";
import VideoBox from "../shared/VideoBox";
import useExercises from "../../hoocks/useExercises";
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
