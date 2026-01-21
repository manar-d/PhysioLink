import { useParams } from "react-router";
import { Box, Container, Typography, Stack } from "@mui/material";
import useLocale from "../hooks/useLocale";

import ExerciseCardsList from "../components/shared/ExerciseCardsList";
import HeaderSection from "../components/shared/HeaderSection";

import useSpecialist from "../hooks/useSpecialist";
import { useEffect } from "react";
import EmptyPaper from "../components/shared/EmptyPaper";

export default function SpecialistDetails() {
  const { id: specialistId } = useParams();

  const { t } = useLocale();

  const { exercisesDetails, getExercisesBySpecialistDetail } = useSpecialist();

  useEffect(() => {
    const loadExercise = async (specialistId) => {
      await getExercisesBySpecialistDetail(specialistId);
    };
    loadExercise(specialistId);
  }, [specialistId]);

  return (
    <>
      {/* Patient Header*/}
      <HeaderSection />

      {/*  Exercise Program */}
      <Container maxWidth="lg">
        <Box sx={{ mt: { xs: 3, sm: 5 } }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
            {t("SpecialistDetails.title")}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {t("SpecialistDetails.subtitle")}
          </Typography>

          <Stack spacing={3}>
            {/* Exercise Card */}
            {exercisesDetails.length === 0 ? (
              <EmptyPaper />
            ) : (
              <ExerciseCardsList exercises={exercisesDetails} />
            )}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
