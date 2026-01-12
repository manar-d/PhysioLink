import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
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
      <Box
        sx={{
          position: "absolute",
          inset: 0, // top:0, right:0, bottom:0, left:0 covers entire box
          background:
            "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.2))",
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
          Modern Physical Therapy Management Platform
        </Typography>

        <Typography
          sx={{
            color: "white",
            maxWidth: { xs: "100%", sm: 500 }, // limit width on larger screens and above
            fontSize: { xs: "0.95rem", sm: "1rem" },
            mb: 3,
          }}
        >
          Advanced tools for physiotherapists and patients to manage treatment
          plans, track progress, and improve recovery outcomes.
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
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.25)",
              borderColor: "white",
            }}
          >
            Learn More
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
