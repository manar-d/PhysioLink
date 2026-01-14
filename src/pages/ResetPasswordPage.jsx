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
} from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuth from "../hooks/useAuth";
import { resetPasswordSchema } from "../schemas/resetPassword.schema";
import { useState } from "react";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { changePassword, loading } = useAuth();
  const { user } = useAuth();

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
    return <Navigate to={`/unauthorized`} replace />;
  }

  const onSubmit = async (data) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      setSnack({
        open: true,
        message: "Password updated successfully",
        severity: "success",
      });

      reset();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setSnack({
        open: true,
        message: err.message || "Failed to update password",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Change Password
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          For security reasons, please change your password before continuing.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            {/* Current Password */}
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              {...register("oldPassword")}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword?.message}
            />

            {/* New Password */}
            <TextField
              label="New Password"
              type="password"
              fullWidth
              {...register("newPassword")}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />

            {/* Confirm Password */}
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? "Updating..." : "Update Password"}
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
