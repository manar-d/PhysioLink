import * as yup from "yup";
import { ROLE_SPECIALIST } from "../auth.constants";

export const loginSchema = (role) =>
  yup.object({
    ...(role === ROLE_SPECIALIST
      ? {
          email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        }
      : {
          phone: yup
            .string()
            .matches(/^05\d{8}$/, "Phone must start with 05 and be 10 digits")
            .required("Phone is required"),
        }),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
