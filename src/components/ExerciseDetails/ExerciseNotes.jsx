import { Box, Typography } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SectionCard from "./SectionCard";
import useLocale from "../../hooks/useLocale";

export default function ExerciseNotes({ notes }) {
  const { t } = useLocale();

  if (!notes) return null;

  return (
    <Box mb={3}>
      <SectionCard
        icon={<FormatListBulletedIcon />}
        title={t("ExerciseNotes.title")}
      >
        <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {notes}
        </Typography>
      </SectionCard>
    </Box>
  );
}
