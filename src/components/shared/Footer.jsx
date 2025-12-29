import { Box, Typography } from "@mui/material";

export default function Footer() {
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
        © {new Date().getFullYear()} PhysioLink
      </Typography>
    </Box>
  );
}
