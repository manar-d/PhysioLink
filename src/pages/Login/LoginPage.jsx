import { useState } from "react";
import { Box, Paper, Tabs, Tab, Typography } from "@mui/material";

import LoginPageTapI from "./LoginPageTapI";
import LoginPageTapII from "./LoginPageTapII";

export default function LoginPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2, // مهم للجوال 
        
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
          <Tab label="Specialist" />
          <Tab label="Patient" />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {tab === 0 && <LoginPageTapI />}
          {tab === 1 && <LoginPageTapII />}
        </Box>
      </Paper>
    </Box>
  );
}
