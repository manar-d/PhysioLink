import { useState } from "react";
import { Box, Paper, Tabs, Tab, Typography } from "@mui/material";

import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const [tab, setTab] = useState("specialist");
  const { user } = useAuth();

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
        position: "relative", // ✅ ضروري عشان نضيف overlay فوق الخلفية

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

      {/* Login Card Wrapper --> position + zIndex to be aove overlay*/}
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
          Login
        </Typography>

        {/* Role Tabs */}
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
        >
          <Tab value="specialist" label="specialist" />
          <Tab value="patient" label="patient" />
        </Tabs>

        {/* Login Form */}
        <Box sx={{ mt: 3 }}>
          <LoginForm key={tab} role={tab} />
        </Box>
      </Paper>
    </Box>
  );
}
