import { useState } from "react";
import { Box, Paper, Tabs, Tab, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import useLocale from "../hooks/useLocale";

import useAuth from "../hooks/useAuth";
import LoginForm from "../components/auth/LoginForm";
import { ROLE_PATIENT, ROLE_SPECIALIST } from "../auth.constants";

export default function LoginPage() {
  const [tab, setTab] = useState(ROLE_SPECIALIST);
  const { user } = useAuth();
  const { t } = useLocale();

  // Redirect if user is already logged in
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
        position: "relative", //Needed to add an overlay on the background.

        //Background image
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/*Overlay layer*/}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(253, 253, 253, 0.77)",
        }}
      />

      {/* Login Card Wrapper --> position + zIndex to be above overlay*/}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420, //  Industry Best Practice px
          p: 3,
          borderRadius: 3,
          position: "relative", // above overlay
          zIndex: 1,
        }}
      >
        {/* Page Title */}
        <Typography variant="h5" fontWeight={700} textAlign="center" mb={2}>
          {t("LoginPage.title")}
        </Typography>

        {/* Role Tabs */}
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
        >
          <Tab value={ROLE_SPECIALIST} label={t("LoginPage.specialist")} />
          <Tab value={ROLE_PATIENT} label={t("LoginPage.patient")} />
        </Tabs>

        {/* Login Form */}
        <Box sx={{ mt: 3 }}>
          <LoginForm key={tab} role={tab} />
        </Box>
      </Paper>
    </Box>
  );
}
