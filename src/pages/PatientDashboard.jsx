import { Box, Container, Typography, Stack } from "@mui/material";
import useLocale from "../hooks/useLocale";

import ExerciseCardsList from "../components/shared/ExerciseCardsList";
import PatientHeader from "../components/patient/PatientHeader";
import usePatient from "../hooks/usePatient";
import EmptyPaper from "../components/shared/EmptyPaper";

export default function PatientDashboard() {
  const { exercises } = usePatient();
  const { t } = useLocale();

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
            {exercises.length === 0 ? (
              <EmptyPaper />
            ) : (
              <ExerciseCardsList exercises={exercises} />
            )}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
