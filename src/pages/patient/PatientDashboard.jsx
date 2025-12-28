import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

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
      {/* Patient Header (FULL WIDTH) */}
      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)",
          borderBottom: "1px solid #e6ebf0",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 2.5, sm: 4 } }}>
            <Stack spacing={1}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.2rem", sm: "1.6rem" },
                  }}
                >
                  {user.name}
                </Typography>

                <Chip label="Patient" size="small" color="success" />
              </Stack>

              <Typography color="text.secondary">
                Post-Surgery Knee Rehabilitation
              </Typography>

              <Typography color="text.secondary">
                Under care of Dr. Sarah Thomas
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>

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
            {exercises.map((exercise) => (
              <Card
                key={exercise.id}
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column", // mobile
                    sm: "row", // desktop
                  },
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={exercise.image}
                  alt={exercise.title}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: 280,
                    },
                    height: {
                      xs: 180, // const for mobile
                      sm: "auto",
                    },
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                {/* Content */}
                <CardContent
                  sx={{
                    flex: 1,
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {exercise.title}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    {exercise.description}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      borderRadius: 3,
                    }}
                  >
                    View Exercise Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>

        </Box>
      </Container>
    </>
  );
}
