import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  IconButton,
  InputAdornment,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import useAuth from "../../hooks/useAuth";
import { loginSchema } from "../../schemas/login.schema";
import { ROLE_SPECIALIST } from "../../constants/auth.constants";
import useLocale from "../../hooks/useLocale";

export default function LoginForm({ role }) {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const { t } = useLocale();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema(role)),
    mode: "onTouched",
  });

  // Reset form when role changes
  useEffect(() => {
    const clear = () => {
      reset();
      clearError();
    };

    clear();
  }, [role, reset]);


  const onSubmit = async (data) => {
    try {
      const user = await login(data, role);
      if (user) {
        navigate(`/${role}`);
      }
    } finally {
      // error handled in useAuth
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Error Message */}
      {error && !loading && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t(`error.${error}`)}
        </Alert>
      )}

      {/* Role-based Identifier Field */}
      {role === ROLE_SPECIALIST ? (
        <TextField
          label={t("LoginForm.email")}
          placeholder={t("LoginForm.emailPlaceholder")}
          fullWidth
          margin="normal"
          type="email"
          error={!!errors.email} //!! means convert to boolean **
          helperText={errors.email && t(`yup.${errors.email.message}`)}
          {...register("email")}
        />
      ) : (
        <TextField
          label={t("LoginForm.phone")}
          placeholder={t("LoginForm.phonePlaceholder")}
          fullWidth
          margin="normal"
          type="tel"
          error={!!errors.phone}
          helperText={errors.phone && t(`yup.${errors.phone.message}`)}
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
        label={t("LoginForm.password")}
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password && t(`yup.${errors.password.message}`)}
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
        {loading || isSubmitting
          ? t("LoginForm.loading")
          : t("LoginForm.submit")}
      </Button>
    </Box>
  );
}
