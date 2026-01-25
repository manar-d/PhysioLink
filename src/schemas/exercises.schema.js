import * as yup from "yup";

export const exercisesSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("required")
    .min(3, "min_3")
    .max(60, "max_60"),

  description: yup
    .string()
    .trim()
    .required("required")
    .min(10, "min_10")
    .max(500, "max_500"),

  // lookup id
  difficultyId: yup
    .number()
    .typeError("select_difficulty")
    .required("select_difficulty"),

  // lookup ids
  categoryIds: yup
    .array()
    .of(yup.number())
    .min(1, "min_1_category"),

  duration: yup
    .number()
    .typeError("number")
    .required("required")
    .min(1, "min_1_minute"),

  image: yup.string().url("invalid_url").nullable(),

  video: yup.string().trim().url("invalid_url").nullable(),
});
