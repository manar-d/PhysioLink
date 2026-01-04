import { Box, Container } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

// xs = mobile, md = tablet, lg = desktop
// Dynamic view height
export default function MainLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isHome = location.pathname === "/";
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          flex: 1,
          py: isLogin || isHome ? 0 : { xs: 2, md: 4 },
        }}
      >
        {isLogin || isHome ? (
          <Outlet />
        ) : (
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        )}
      </Box>

      <Footer />
    </Box>
  );
}
