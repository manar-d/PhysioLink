import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

import ManageExercises from "../components/specialist/ManageExercises";
import PatientsTab from "../components/specialist/PatientsTab";
import SpecialistProfileHeader from "../components/specialist/SpecialistProfileHeader";

export default function SpecialistDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      {/*  Profile Header  */}
      <SpecialistProfileHeader />

      {/*  Tabs  */}
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
        <Tab label="My Exercises" />
        <Tab label="My Patients" />
      </Tabs>

      {/*  Content  */}
      {tab === 0 && <ManageExercises />}
      {tab === 1 && <PatientsTab />}
    </Box>
  );
}
