import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import i18n from "../../i18n";
import useLocale from "../../hooks/useLocale";

export default function HeroSection() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const isRTL = i18n.dir() === "rtl";

  return (
    <Box
      sx={{
        minHeight: { xs: "60vh", md: "70vh" },
        display: "flex",
        alignItems: "center",
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        textAlign: { xs: "center", md: "left" },
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: isRTL
            ? "linear-gradient(to left, rgba(0,0,0,0.55), rgba(0,0,0,0.2))"
            : "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.2))",
        }}
      />

      <Container
        sx={{
          position: "relative",
          zIndex: 1, // to be above the overlay
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 700,
            color: "white",
            lineHeight: 1.2,
          }}
          gutterBottom
        >
          {t("HeroSection.title")}
        </Typography>

        <Typography
          sx={{
            color: "white",
            maxWidth: { xs: "100%", sm: 500 }, // limit width on larger screens and above
            fontSize: { xs: "0.95rem", sm: "1rem" },
            mb: 3,
          }}
        >
          {t("HeroSection.description")}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
          >
            {t("HeroSection.getStarted")}
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/about")}
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.25)",
              borderColor: "white",
            }}
          >
            {t("HeroSection.learnMore")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
