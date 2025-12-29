import { useState } from "react";
import { Box, Paper, Tabs, Tab, Typography } from "@mui/material";

import LoginPageTapI from "./LoginPageTapI";
import LoginPageTapII from "./LoginPageTapII";
import useAuth from "../../hoocks/useAuth";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [tab, setTab] = useState(0);
  const { user } = useAuth();

  // if user login
  if (user) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2, // important for mobile
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420, //  Industry Best Practice px
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700} textAlign="center" mb={2}>
          Login
        </Typography>

        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
        >
          <Tab label="specialist" />
          <Tab label="patient" />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {tab === 0 && <LoginPageTapI />}
          {tab === 1 && <LoginPageTapII />}
        </Box>
      </Paper>
    </Box>
  );
}
