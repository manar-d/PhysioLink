import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";

import ManageExercises from "../components/specialist/ManageExercises";
import ManagePatients from "../components/specialist/ManagePatients";
import SpecialistProfileHeader from "../components/specialist/SpecialistProfileHeader";

export default function SpecialistDashboard() {
  const [tab, setTab] = useState(0);
  const { t } = useTranslation();

  return (
    <Box>
      {/* Profile Header */}
      <SpecialistProfileHeader />

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
          },
        }}
      >
        <Tab label={t("SpecialistDashboard.myExercises")} />
        <Tab label={t("SpecialistDashboard.myPatients")} />
      </Tabs>

      {/* Content */}
      {tab === 0 && <ManageExercises />}
      {tab === 1 && <ManagePatients />}
    </Box>
  );
}
