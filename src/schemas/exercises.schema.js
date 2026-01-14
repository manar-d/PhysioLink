import * as yup from "yup";

export const exercisesSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(60, "Title must be at most 60 characters"),

  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),

  // lookup id
  difficultyId: yup
    .number()
    .typeError("Please select difficulty level")
    .required("Please select difficulty level"),

  // lookup ids
  categoryIds: yup
    .array()
    .of(yup.number())
    .min(1, "Select at least one category"),

  duration: yup.string().required("Duration is required"),

  image: yup.url("Image must be a valid URL"),

  video: yup.url("Video must be a valid URL")
});