import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPatient, loginSpecialist } from "../../api/auth.api";


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField, Button, Box, Typography } from "@mui/material";

// validation schema
const schema = yup.object({
  phone: yup
    .string()
    .matches(/^05\d{8}$/, "Phone number must start with 05 and be 10 digits")
    .required("Phone number is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPageTapII() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // Submit
  const onSubmit = async (data) => {

        try {
      console.log("Login Data TapII:", data);

      const res = await loginPatient(data.phone, data.password);

      if (res.data.message) {
        alert("error!");
      } else {
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Login successful!");
        navigate("/patient");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >

      <TextField
        label="Mobile Number"
        fullWidth
        margin="normal"
        placeholder="05XXXXXXXX"
        type="tel"
        error={!!errors.phone} //!! means convert to boolean **
        helperText={errors.phone?.message}
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          maxLength: 10,
        }}
        {...register("phone")}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        variant="outlined"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 3 }}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
}
