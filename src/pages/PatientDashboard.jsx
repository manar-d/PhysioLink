import { Box, Container, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import ExerciseCard from "../components/shared/ExerciseCard";
import PatientHeader from "../components/patient/PatientHeader";
import usePatient from "../hooks/usePatient";

export default function PatientDashboard() {
  const { exercises } = usePatient();
  const { t } = useTranslation();

  return (
    <>
      {/* Patient Header*/}
      <PatientHeader />

      {/*  Exercise Program */}
      <Container maxWidth="lg">
        <Box sx={{ mt: { xs: 3, sm: 5 } }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
            {t("PatientDashboard.title")}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {t("PatientDashboard.subtitle")}
          </Typography>

          <Stack spacing={3}>             
            {/* Exercise Card */}
            <ExerciseCard exercises={exercises} />
          </Stack>
        </Box>
      </Container>
    </>
  );
}