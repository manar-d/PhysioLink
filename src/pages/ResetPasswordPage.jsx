import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useLocale from "../hooks/useLocale";
import { useState } from "react";

import useAuth from "../hooks/useAuth";
import { resetPasswordSchema } from "../schemas/resetPassword.schema";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { changePassword, loading, user, error } = useAuth();

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onTouched",
  });

  if (!user) {
    return <Navigate to="/unauthorized" replace />;
  }

  const onSubmit = async (data) => {
  
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      setSnack({
        open: true,
        message: t("ResetPassword.success"),
        severity: "success",
      });

      reset();

      setTimeout(() => {
        navigate("/");
      }, 1500);

  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {t("ResetPassword.title")}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          {t("ResetPassword.subtitle")}
        </Typography>
        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {t(`error.${error}`)}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            {/* Current Password */}
            <TextField
              label={t("ResetPassword.currentPassword")}
              type={showOld ? "text" : "password"}
              fullWidth
              {...register("oldPassword")}
              error={!!errors.oldPassword}
              helperText={
                errors.oldPassword && t(`yup.${errors.oldPassword.message}`)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowOld((v) => !v)}
                      edge="end"
                    >
                      {showOld ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* New Password */}
            <TextField
              label={t("ResetPassword.newPassword")}
              type={showNew ? "text" : "password"}
              fullWidth
              {...register("newPassword")}
              error={!!errors.newPassword}
              helperText={
                errors.newPassword && t(`yup.${errors.newPassword.message}`)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNew((v) => !v)}
                      edge="end"
                    >
                      {showNew ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password */}
            <TextField
              label={t("ResetPassword.confirmPassword")}
              type={showConfirm ? "text" : "password"}
              fullWidth
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword &&
                t(`yup.${errors.confirmPassword.message}`)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm((v) => !v)}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading
                ? t("Common.updating")
                : t("ResetPassword.submit")}
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
