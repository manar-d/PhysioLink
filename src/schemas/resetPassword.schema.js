import * as yup from "yup";

export const resetPasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required("required"),

  newPassword: yup
    .string()
    .required("required")
    .min(8, "min_8")
    .notOneOf(
      [yup.ref("oldPassword")],
      "password_must_be_different"
    ),

  confirmPassword: yup
    .string()
    .required("required")
    .oneOf([yup.ref("newPassword")], "passwords_not_match"),
});
