import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useHome from "../../hooks/useHome";

export default function SpecialistsSection() {
  const { allSpecialists } = useHome(); // TODO: handle loading & error states
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container sx={{ py: 8 }}>
      {/* header */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-end" }}
        justifyContent="space-between"
        spacing={2}
        mb={4}
        textAlign={{ xs: "center", md: "left" }} 
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {t("SpecialistsSection.title")}
          </Typography>
          <Typography color="text.secondary">
            {t("SpecialistsSection.subtitle")}
          </Typography>
        </Box>

        <Button
          sx={{
            mt: { xs: 1, md: 0 },
            color: "#259687ff",
            backgroundColor: "#fff",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#259687ff",
            },
          }}
          endIcon={<ChevronRightIcon />}
        >
          {t("SpecialistsSection.viewAll")}
        </Button>
      </Stack>

      {/* Cards */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {allSpecialists.map((specialist) => (
          <Card
            key={specialist.id}
            sx={{
              flex: 1, // equal width
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: 6,
              },
            }}
          >
            <CardMedia
              component="img"
              image={specialist.image}
              alt={specialist.name}
              sx={{
                height: 300,
                objectFit: "cover",
                objectPosition: "center 20%", // focus on upper part of image
              }}
            />

            <CardContent>
              <Typography fontWeight={700}>
                {specialist.name}
              </Typography>
              {/* need to translate specialty */}
              <Typography color="text.secondary" fontSize={14} mb={2}>
                {specialist.specialty}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/specialists/${specialist.id}`)}
              >
                {t("SpecialistsSection.viewProfile")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}