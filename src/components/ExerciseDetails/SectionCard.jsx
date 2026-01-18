import { Box, Typography, Paper } from "@mui/material";

export default function SectionCard({ icon, title, children }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: "#e6e8ef",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 1.8,
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: "#f6fbf9",
          borderBottom: "1px solid #e6e8ef",
        }}
      >
        <Box sx={{ color: "#0f766e" }}>{icon}</Box>
        <Typography fontWeight={700}>{title}</Typography>
      </Box>

      {/* Body */}
      <Box sx={{ p: 2.5 }}>{children}</Box>
    </Paper>
  );
}