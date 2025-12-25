import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center">
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

        <Button variant="outlined" size="large">
          Learn More
        </Button>
      </Stack>
    </Box>
  );
}