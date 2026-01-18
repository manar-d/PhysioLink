import { Box, Typography } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SectionCard from "./SectionCard";

export default function ExerciseNotes({ notes }) {
  if (!notes) return null;

  return (
    <Box mb={3}>
      <SectionCard icon={<FormatListBulletedIcon />} title="Specialist Notes">
        <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {notes}
        </Typography>
      </SectionCard>
    </Box>
  );
}
