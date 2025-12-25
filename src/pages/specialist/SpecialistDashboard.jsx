import { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Chip,
  Tabs,
  Tab,
  Stack,
  Grid,
  Paper,
} from "@mui/material";

import ManageExercises from "./ManageExercises";
import PatientsTab from "./PatientsTab";

export default function SpecialistDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      {/*  Profile Header  */}
<Paper
  sx={{
    p: { xs: 2.5, md: 4 },
    borderRadius: 3,
    mb: 4,
    backgroundColor: "#f7fbfb",
  }}
>
  <Stack
    direction="row"
    spacing={{ xs: 2, md: 4 }}
    alignItems="flex-start"
  >
    {/* Avatar */}
    <Avatar
      src="/images/profile.jpg"
      sx={{
        width: { xs: 56, md: 80 },
        height: { xs: 56, md: 80 },
      }}
    />

    {/* Info */}
    <Box flex={1}>
      {/* Name */}
      <Typography
        fontWeight={600}
        sx={{
          fontSize: { xs: 16, md: 20 },
          lineHeight: 1.3,
        }}
      >
        Dr. Sarah Thomas
      </Typography>

      {/* Specialty */}
      <Typography
        color="text.secondary"
        sx={{
          fontSize: { xs: 13, md: 14 },
        }}
      >
        Orthopedic Physiotherapist
      </Typography>

      {/* Experience (Desktop only) */}
      <Typography
        color="text.secondary"
        sx={{
          fontSize: 13,
          display: { xs: "none", md: "block" },
        }}
      >
        15+ years experience
      </Typography>

      {/* Description (Desktop only) */}
      <Typography
        sx={{
          mt: 1,
          maxWidth: 520,
          fontSize: 13,
          lineHeight: 1.6,
          color: "text.secondary",
          display: { xs: "none", md: "block" },
        }}
      >
        Specialized in sports injuries and rehabilitation with over
        15 years of experience.
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        size="small"
        sx={{
          mt: 2,
          textTransform: "none",
        }}
      >
        Edit Profile
      </Button>
    </Box>
  </Stack>
</Paper>




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
