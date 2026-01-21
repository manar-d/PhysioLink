import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Alert,
  MenuItem,
  Paper,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import useLocale from "../../hooks/useLocale";

import useAuth from "../../hooks/useAuth";
import usePatient from "../../hooks/usePatient";
import useExerciseFormLookups from "../../hooks/useExerciseFormLookups";
import { patientSchema } from "../../schemas/patient.schema";

export default function AddPatient() {
  const { user } = useAuth(); // specialist
  const { addPatient, loading, error } = usePatient();
  const navigate = useNavigate();
  const { t } = useLocale();

  // lookups
  const { gender = [] } = useExerciseFormLookups();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(patientSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      phone: "",
      diagnosis: "",
    },
  });

  const onSubmit = async (data) => {
    const patient = await addPatient({
      name: data.name,
      age: Number(data.age),
      gender: Number(data.gender), // lookup id
      phone: data.phone,
      diagnosis: data.diagnosis,
      specialistId: user.id,
    });

    navigate(`/specialist/assign-exercises/${patient.id}`);
  };

  return (
    <Box maxWidth={520} mx="auto">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          {t("NewPatient.title")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {t(`error.${error}`)}
          </Alert>
        )}

        <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <TextField
            label={t("NewPatient.fullName")}
            placeholder={t("NewPatient.fullNamePlaceholder")}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />

          {/* Age + Gender */}
          <Stack direction="row" spacing={2}>
            <TextField
              label={t("NewPatient.age")}
              placeholder={t("NewPatient.agePlaceholder")}
              {...register("age")}
              error={!!errors.age}
              helperText={errors.age?.message}
              fullWidth
              inputProps={{ inputMode: "numeric" }}
            />

            {/* Gender */}
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label={t("NewPatient.gender")}
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >
                  {gender.map((g) => (
                    <MenuItem key={g.id} value={g.id}>
                      {t(`gender.${g.key}`)}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>

          {/* Phone */}
          <TextField
            label={t("NewPatient.phone")}
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            inputProps={{ inputMode: "numeric" }}
          />

          {/* Diagnosis */}
          <TextField
            label={t("NewPatient.diagnosis")}
            {...register("diagnosis")}
            multiline
            rows={3}
            error={!!errors.diagnosis}
            helperText={errors.diagnosis?.message}
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? t("Common.creating") : t("Common.create")}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}