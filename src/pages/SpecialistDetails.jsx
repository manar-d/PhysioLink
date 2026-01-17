import { useParams } from "react-router";
import { Box, Container, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import ExerciseCard from "../components/shared/ExerciseCard";
import HeaderSection from "../components/shared/HeaderSection";

import usePatient from "../hooks/usePatient";
import useSpecialist from "../hooks/useSpecialist";
import { useEffect } from "react";


export default function SpecialistDetails() {
  const { id } = useParams();
  const specialistId = id;

  const { t } = useTranslation();


  const { exercisesDetails, getExercisesBySpecialistDetail, loading, error } =
    useSpecialist();

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
            <ExerciseCard exercises={exercisesDetails} />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
