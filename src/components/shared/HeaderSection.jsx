import { Box, Container, Typography, Stack, Avatar } from "@mui/material";
import usePatient from "../../hooks/usePatient";

export default function HeaderSection() {
  const { specialist } = usePatient();

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
          {specialist && (
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
                src={specialist.image}
                alt={specialist.name}
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
                  {specialist.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                >
                  {specialist.specialty}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                >
                  Experience: {specialist.experience}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: "600px",
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                  }}
                >
                  {specialist.bio}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Box>
      </Container>
    </Box>
  );
}
