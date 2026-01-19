import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useHome from "../../hooks/useHome";

export default function SpecialistsSection() {
  const { homeSpecialists } = useHome();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container sx={{ py: 8 }}>
      {/* HEADER */}
      <Stack
        direction="column"
        alignItems={{ xs: "center", md: "flex-start" }}
        spacing={1}
        mb={4}
        textAlign={{ xs: "center", md: "left" }}
      >
        <Typography variant="h5" fontWeight={700}>
          {t("SpecialistsSection.title")}
        </Typography>
        <Typography color="text.secondary">
          {t("SpecialistsSection.subtitle")}
        </Typography>
      </Stack>

      {/* Cards */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {homeSpecialists.map((specialist) => (
          <Card
            key={specialist.id}
            sx={{
              flex: 1, // equal width
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
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

            {/* Content */}
            <CardContent>
              <Typography fontWeight={700}>{specialist.name}</Typography>

              <Typography color="text.secondary" fontSize={14}>
                {t(`specialty.${specialist.specialty}`)}
              </Typography>
            </CardContent>

            {/* Button Fixed Position */}
            <CardActions sx={{ mt: "auto", px: 2, pb: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() =>
                  navigate(`/specialists/${specialist.specialistId}`)
                }
              >
                {t("SpecialistsSection.viewProfile")}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
