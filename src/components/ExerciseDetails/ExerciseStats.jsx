import { Stack, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StatCard from "./StatCard";
import useLocale from "../../hooks/useLocale";

export default function ExerciseStats({ duration, difficulty }) {
  const { t } = useLocale();

  return (
    <Stack
      spacing={{ xs: 2, sm: 2.5 }}
      mb={3}
      direction={{ xs: "column", sm: "row" }}
    >
      <Box sx={{ flex: 1 }}>
        <StatCard
          icon={<AccessTimeIcon />}
          label={t("ExerciseStats.duration")}
          value={t("Common.duration", {
            time: duration ?? "-",
          })}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <StatCard
          icon={<InfoOutlinedIcon />}
          label={t("ExerciseStats.difficulty")}
          value={t(`difficulty.${difficulty}`)}
        />
      </Box>
    </Stack>
  );
}
