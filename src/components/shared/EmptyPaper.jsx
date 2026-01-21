import { Paper, Typography } from "@mui/material";
import React from "react";
import {
  ROLE_PATIENT,
  ROLE_SPECIALIST,
} from "../../constants/auth.constants";
import useLocale from "../../hooks/useLocale";

export default function EmptyPaper({ mode = ROLE_PATIENT }) {
  const { t } = useLocale();
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        color: "text.secondary",
      }}
    >
      <Typography>
        {t("ExerciseCardsList.empty")}
        {mode === ROLE_SPECIALIST && (
          <>{t("ExerciseCardsList.emptySpecialist")}</>
        )}
      </Typography>
    </Paper>
  );
}
