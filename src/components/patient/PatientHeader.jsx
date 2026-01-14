import { Box, Container, Typography, Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "../../context/AuthContext";
import usePatient from "../../hooks/usePatient";

export default function PatientHeader() {  
  const { user } = useAuthContext();

  const { specialist } = usePatient();
  const { t } = useTranslation();

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

              <Chip
                label={t("PatientHeader.role")}
                size="small"
                color="success"
              />
            </Stack>

            <Typography color="text.secondary">
              {t("PatientHeader.program")}
            </Typography>

            {specialist && (
              /* Patient's specialist */
              <Typography color="text.secondary">
                {t("PatientHeader.underCareOf", {
                  name: specialist?.name,
                })}
              </Typography>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
