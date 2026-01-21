import * as yup from "yup";
import { ROLE_SPECIALIST } from "../constants/auth.constants";

export const loginSchema = (role) =>
  yup.object({
    ...(role === ROLE_SPECIALIST
      ? {
          email: yup
            .string()
            .required("required")
            .email("invalid_email"),
        }
      : {
          phone: yup
            .string()
            .required("required")
            .matches(/^05\d{8}$/, "invalid_phone"),
        }),

    password: yup
      .string()
      .required("required")
      .min(6, "min_6"),
  });
