import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import useLocale from "../hooks/useLocale";

export default function AboutPage() {
  const { t } = useLocale();

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight={700}>
            {t("About.title")}
          </Typography>

          <Typography color="text.secondary">
            {t("About.intro")}
          </Typography>

          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {t("About.whatTitle")}
            </Typography>
            <Typography color="text.secondary">
              {t("About.whatDesc")}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {t("About.whoTitle")}
            </Typography>
            <Typography color="text.secondary">
              • {t("About.whoSpecialist")}
              <br />
              • {t("About.whoPatient")}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {t("About.goalTitle")}
            </Typography>
            <Typography color="text.secondary">
              {t("About.goalDesc")}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
