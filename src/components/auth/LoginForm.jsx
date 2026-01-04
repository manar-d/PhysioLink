import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField, Button, Box, Alert } from "@mui/material";

import useAuth from "../../hooks/useAuth";
import { loginSchema } from "../../schemas/login.schema";

export default function LoginForm({ role }) {
  const { login, loading, error,clearError } = useAuth();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema(role)), //Schema
    mode: "onTouched",
  });

  // Reset form fields and errors whenever the role changes
  useEffect(() => {
    const clear = () => {
      reset();
      clearError();
    };

    clear();
  }, [role, reset]);

  const onSubmit = async (data) => {
    try {
      await login(data, role);
      navigate(`/${role}`);
    } catch {
      //handly in useAuth
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Error Message  */}
      {error && !loading && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Role-based Identifier Field */}

      {role === "specialist" ? (
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
      ) : (
        <TextField
          label="Mobile Number"
          fullWidth
          margin="normal"
          placeholder="05XXXXXXXX"
          type="tel"
          error={!!errors.phone}
          helperText={errors.phone?.message}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 10,
          }}
          {...register("phone")}
        />
      )}

      {/* Password */}

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

      {/* Submit */}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading || isSubmitting}
        sx={{ mt: 3 }}
      >
        {loading || isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
}
