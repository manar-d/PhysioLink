import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//xs جوال - md تابلت - lg كمبيوتر
// Dynamic view height
export default function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <Box component="main" sx={{ flex: 1, py: { xs: 2, md: 4 } }}> 
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
