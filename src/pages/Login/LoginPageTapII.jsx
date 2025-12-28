import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import useAuth from "../../hoocks/useAuth";

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
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

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
    setLoginError(""); // clean old error

    try {
      await login(data, "patient");
      navigate("/patient");
    } catch (error) {
      setLoginError("Login failed: check your credentials");
      console.error("Login failed:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )}
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
