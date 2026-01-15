import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePatient from "../../hooks/usePatient.js";


export default function AddPatient() {
  const { user } = useAuth(); // specialist
  const { addPatient, loading } = usePatient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");

    try {
      const patient = await addPatient({
        phone: data.phone,
        name: data.name,
        diagnosis: data.diagnosis,
        specialistId: user.id,
      });

      //navigate(`/specialist`);
       navigate(`/specialist/assign-exercises/${patient.id}`);
    } catch (e) {
      setError(e.message || "Failed to add patient");
    }
  };

  return (
    <Box maxWidth={520} mx="auto">
      <Typography variant="h5" mb={3}>
        Add Patient
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Phone */}
        <TextField
          label="Phone Number"
          {...register("phone", {
            required: "Phone number is required",
            minLength: {
              value: 9,
              message: "Invalid phone number",
            },
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          inputProps={{ inputMode: "numeric" }}
        />

        {/* Name */}
        <TextField
          label="Name"
          {...register("name")}
        />

        {/* Diagnosis */}
        <TextField
          label="Diagnosis"
          {...register("diagnosis")}
          multiline
          rows={3}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          Add Patient
        </Button>
      </Stack>
    </Box>
  );
}