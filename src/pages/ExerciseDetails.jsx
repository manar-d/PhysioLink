import React from "react";
import { useParams } from "react-router";

export default function ExerciseDetails() {
  const { id } = useParams();
  const exerciseId = id;

  return (
    <>
      <h1>ExerciseDetails {exerciseId} </h1>
    </>
  );
}
