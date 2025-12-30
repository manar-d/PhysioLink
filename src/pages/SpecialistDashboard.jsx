import { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";

import ManageExercises from "../components/specialist/ManageExercises";
import PatientsTab from "../components/specialist/PatientsTab";
import SpecialistProfileHeader from "../components/specialist/SpecialistProfileHeader";

export default function SpecialistDashboard() {
  const [tab, setTab] = useState(0);
  const location = useLocation();

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
console.log("location.state =", location.state);

  useEffect(() => {
    console.log("location ",location);
    console.log("location.state ",location.state);
    console.log("location.state?.snack",location.state?.snack);

    if (!location.state?.snack) return;
      setSnack({
        open: true,
        message: location.state.snack.message,
        severity: location.state.snack.severity,
      });
        console.log("snack 1 ", location.state.snack.message);
    

    console.log("snack 2 ", snack);
  }, [location.state]);

  return (
    <Box>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>

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
