import { Box, Typography, Stack, Paper } from "@mui/material";

export default function StatCard({ icon, label, value }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: "#e6e8ef",
        p: 2.5,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            display: "grid",
            placeItems: "center",
            bgcolor: "#eaf7f2",
            color: "#0f766e",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography fontWeight={700} mt={0.3}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}