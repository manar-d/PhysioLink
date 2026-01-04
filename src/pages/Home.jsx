import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      textAlign="center"
      sx={{
        minHeight: "100dvh",
        position: "relative", // ✅ ضروري عشان نضيف overlay فوق الخلفية
        //Background image
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/*Overlay layer*/}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(3px)", 
          backgroundColor: "rgba(253, 253, 253, 0.77)", 
        }}
      />
      <Box
        sx={{
          position: "relative", // above overlay
          zIndex: 1,
          pt:8
        }}
      >
        <Typography variant="h3" fontWeight={700} mb={2}>
          PhysioLink
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Connect patients with professional physiotherapists
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>

          <Button variant="outlined" size="large"       
          sx={{
          backgroundColor: "rgba(253, 253, 253, 0.84)", 
        }}>
            Learn More
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
