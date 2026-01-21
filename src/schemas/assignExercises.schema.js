import * as yup from "yup";

export const assignExercisesSchema = yup.object({
  exercises: yup
    .array()
    .of(
      yup.object({
        exerciseId: yup.string().required("required"),
        notes: yup.string(),
      })
    )
    .min(1, "min_1_exercise"),
});
