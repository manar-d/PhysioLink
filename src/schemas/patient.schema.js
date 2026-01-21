import * as yup from "yup";

export const patientSchema = yup.object({
  name: yup
    .string()
    .required("required")
    .min(2, "min_2"),

  age: yup
    .number()
    .typeError("number")
    .required("required")
    .min(1, "invalid_age")
    .max(150, "invalid_age"),

  gender: yup
    .number()
    .typeError("required")
    .required("required"),
    
  diagnosis: yup
    .string()
    .required("required"),

  phone: yup
    .string()
    .required("required")
    .min(9, "invalid_phone")
    .matches(/^05\d{8}$/, "invalid_phone"),
});
