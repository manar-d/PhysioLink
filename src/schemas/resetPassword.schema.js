import * as yup from "yup";

export const resetPasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required("Current password is required"),

  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .notOneOf(
      [yup.ref("oldPassword")],
      "New password must be different from current password"
    ),

  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});
