import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "leaflet/dist/leaflet.css";
import "./i18n";

import App from "./App.jsx";
import { initDB } from "./mockdb/mockDatabase.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/appTheme.js";

initDB();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
