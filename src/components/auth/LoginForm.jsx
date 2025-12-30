import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hoocks/useAuth";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../schemas/login.schema";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField, Button, Box, Alert } from "@mui/material";

export default function LoginForm({ role }) {
  const { login , loading} = useAuth();
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

  useEffect(() => {
    reset(); 
    setLoginError(""); 
  }, [role,reset]);

  const onSubmit = async (data) => {
    // setLoginError(""); // clean old error
    try {
      await login(data, role);
      navigate(`/${role}`);
    } catch {
      setLoginError("Login failed: check your credentials");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {loginError && !loading && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )}

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
          error={!!errors.phone} //!! means convert to boolean **
          helperText={errors.phone?.message}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 10,
          }}
          {...register("phone")}
        />
      )}

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
        disabled={loading || isSubmitting}
        sx={{ mt: 3 }}
      >
        {loading || isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
}
