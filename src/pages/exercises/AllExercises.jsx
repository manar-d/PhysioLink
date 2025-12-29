import React from "react";
import VideoBox from "../../components/VideoBox";
import useExercises from "../../hoocks/useExercises";
import { Button } from "@mui/material";

export default function AllExercises() {
  const { editExercise } = useExercises();

  const handlclick = () => {
    const b = editExercise(1, { category: "asdfghjklzsgdxhfcvkbj" });
    console.log(" editExercise ", b);
  };
  return (
    <div>
      <VideoBox />
      <p>All Exercises</p>
      <Button onClick={handlclick}> check </Button>
    </div>
  );
}
