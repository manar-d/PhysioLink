import { Paper, Typography } from "@mui/material";

export default function EmptyPaper({ message }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        color: "text.secondary",
      }}
    >
      <Typography>{message}</Typography>
    </Paper>
  );
}
