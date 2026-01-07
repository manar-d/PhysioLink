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

  difficulty: yup
    .string()
    .oneOf(
      ["beginner", "intermediate", "advanced"],
      "Select a valid difficulty"
    )
    .required("Please select difficulty level"),

  category: yup
    .string()
    .oneOf(["knee", "women", "sport"], "Select a valid category")
    .required("Please select category"),
});