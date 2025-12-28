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
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPageTapI() {
  const { login } = useAuth();
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched", // Validate on touch
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data) => {
    setLoginError(""); // clean old error

    try {
      await login(data, "specialist");
      navigate("/specialist");
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
        label="Email"
        fullWidth
        margin="normal"
        placeholder="test@test.com"
        type="email"
        error={!!errors.email} //!! means convert to boolean **
        helperText={errors.email?.message}
        {...register("email")}
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
