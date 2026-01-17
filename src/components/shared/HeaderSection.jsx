import { Box, Container, Typography, Stack, Avatar } from "@mui/material";
import usePatient from "../../hooks/usePatient";
import useSpecialist from "../../hooks/useSpecialist";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function HeaderSection() {
  //const { specialist } = usePatient();
  const { id } = useParams();
  const specialistId = id;

  const { specialistDetails, getSpecialistDetails, loading, error } =
    useSpecialist();

  useEffect(() => {
    const loadSpecialist = async (specialistId) => {
      await getSpecialistDetails(specialistId);
    };
    loadSpecialist(specialistId);
  }, [specialistId]);

  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)",
        borderBottom: "1px solid #e6ebf0",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 2.5, sm: 4 } }}>
          {specialistDetails && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "flex-start", sm: "center" }}
              sx={{
                mt: 1,
                p: 2,
                borderRadius: 2,
              }}
            >
              {/* Specialist Image */}
              <Avatar
                src={specialistDetails.image}
                alt={specialistDetails.name}
                sx={{
                  width: { xs: 90, sm: 110, md: 130 },
                  height: { xs: 90, sm: 110, md: 130 },
                }}
              />

              {/* Specialist Info */}
              <Stack spacing={0.5}>
                <Typography
                  fontWeight={600}
                  sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
                >
                  {specialistDetails.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                >
                  {specialistDetails.specialty}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                >
                  Experience: {specialistDetails.experience}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: "600px",
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                  }}
                >
                  {specialistDetails.bio}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Box>
      </Container>
    </Box>
  );
}
