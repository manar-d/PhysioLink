import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        mt:4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      {/* 401 */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 96, md: 140 },
          fontWeight: 300,
          mb: 1,
        }}
      >
        401
      </Typography>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 1,
        }}
      >
        {t("UnauthorizedPage.title")}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          color: "text.secondary",
          mb: 4,
          maxWidth: 420,
        }}
      >
        {t("UnauthorizedPage.description")}
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        sx={{
          px: 4,
          py: 1.2,
          textTransform: "none",
        }}
        onClick={() => navigate("/login")}
      >
        {t("UnauthorizedPage.goLogin")}
      </Button>
    </Box>
  );
}