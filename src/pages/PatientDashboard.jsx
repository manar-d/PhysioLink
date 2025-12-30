import { useEffect, useState } from "react";
import { Box, Container, Typography, Stack } from "@mui/material";
import ExerciseCard from "../components/shared/ExerciseCard";
import PatientHeader from "../components/patient/PatientHeader";

export default function PatientDashboard() {
  /* Mock Patie */
  const user = {
    id: 1,
    role: "patient",
    name: "Manar Mhammed",
  };

  /* exercises */
  const [exercises, setExercises] = useState([]);

  /* Mock Exercis */
  useEffect(() => {
    setExercises([
      {
        id: 1,
        title: "Knee Strengthening Exercise",
        description:
          "Gentle knee strengthening routine for improved mobility and reduced pain.",
        image:
          "https://columbiaclinic.us/wp-content/uploads/2020/11/physical-therapy.jpg",
      },
      {
        id: 2,
        title: "Leg Raise",
        description:
          "Strengthening exercise to improve leg stability and muscle control.",
        image:
          "https://columbiaclinic.us/wp-content/uploads/2020/11/physical-therapy.jpg",
      },
    ]);
  }, []);

  return (
    <>
      {/* Patient Header*/}
      <PatientHeader user={user} />

      {/*  Exercise Program */}
      <Container maxWidth="lg">
        <Box sx={{ mt: { xs: 3, sm: 5 } }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
            My Exercise Program
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Complete your assigned exercises to track your recovery progress
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
