import { useParams } from "react-router";
import UnderConstructionPage from "../components/shared/UnderConstructionPage";
  import { Box, Container, Typography, Stack } from "@mui/material";
import ExerciseCard from "../components/shared/ExerciseCard";

import usePatient from "../hooks/usePatient";
import HeaderSection from "../components/shared/HeaderSection";

export default function SpecialistDetails() {
  const { id } = useParams();
  const specialistId = id;

const{exercises}=usePatient()


  return (
    <>
      {/* Patient Header*/}
      <HeaderSection />

      {/*  Exercise Program */}
      <Container maxWidth="lg">
        <Box sx={{ mt: { xs: 3, sm: 5 } }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
             Exercises 
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Choose it exercise by the specialist to track your recovery progress
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