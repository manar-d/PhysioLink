import React from "react";
import { Box, Container, Typography, Chip, Stack } from "@mui/material";

import { useAuthContext } from "../../context/AuthContext";
import usePatient from "../../hooks/usePatient";

export default function PatientHeader() {
  // Logged-in patient info
  const { user } = useAuthContext();

  // Patient's specialist information
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
          <Stack spacing={1}>
            
            {/* Patient name & role */}
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

            {/* Patient's specialist */}
            <Typography color="text.secondary">
              Under care of {specialist?.name}
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
