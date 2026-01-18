import { Stack, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StatCard from "./StatCard";

export default function ExerciseStats({ duration, difficulty }) {
  return (
    <Stack
      spacing={{ xs: 2, sm: 2.5 }}
      mb={3}
      direction={{ xs: "column", sm: "row" }}
    >
      <Box sx={{ flex: 1 }}>
        <StatCard
          icon={<AccessTimeIcon />}
          label="Duration"
          value={`${duration ?? "-"}`}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        <StatCard
          icon={<InfoOutlinedIcon />}
          label="Difficulty Level"
          value={difficulty}
        />
      </Box>
    </Stack>
  );
}
