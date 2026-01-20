import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useLocale from "../hooks/useLocale";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      {/* 404 */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 96, md: 140 },
          fontWeight: 300,
          mb: 1,
        }}
      >
        404
      </Typography>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 1,
        }}
      >
        {t("NotFoundPage.title")}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          color: "text.secondary",
          mb: 4,
          maxWidth: 420,
        }}
      >
        {t("NotFoundPage.description")}
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        sx={{
          px: 4,
          py: 1.2,
          textTransform: "none",
        }}
        onClick={() => navigate("/")}
      >
        {t("NotFoundPage.goHome")}
      </Button>
    </Box>
  );
}
