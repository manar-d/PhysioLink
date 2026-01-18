import * as yup from "yup";

export const patientSchema = yup.object({
  name: yup
    .string()
    .required("Full name is required")
    .min(2, "Name is too short"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(1, "Invalid age")
    .max(150, "Invalid age"),

  gender: yup
    .number()
    .typeError("Gender is required")
    .required("Gender is required"),
    
  diagnosis: yup.string().required("diagnosis is required"),

  phone: yup
    .string()
    .required("Phone number is required")
    .min(9, "Invalid phone number")
    .matches(/^05\d{8}$/, "Phone must start with 05 and be 10 digits"),
});
