import { Box, Typography } from "@mui/material";
import useLocale from "../../hooks/useLocale";

export default function Footer() {
  const { t } = useLocale();

  return (
    <Box
      sx={{
        py: 3,
        textAlign: "center",
        borderTop: "1px solid #eee",
        color: "text.secondary",
      }}
    >
      <Typography variant="body2">
        {t("Footer.copyright", { year: new Date().getFullYear() })}
      </Typography>
    </Box>
  );
}
