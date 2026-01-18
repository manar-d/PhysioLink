import * as yup from "yup";

export const assignExercisesSchema = yup.object({
  exercises: yup
    .array()
    .of(
      yup.object({
        exerciseId: yup.number().required(),
        notes: yup.string(),
      })
    )
    .min(1, "Please add at least one exercise"),
});
