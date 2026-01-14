import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./i18n";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { initDB } from "./mockdb/mockDatabase.js";
import { AuthProvider } from "./context/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

import theme from "./theme/appTheme.js";

initDB();

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const cacheLtr = createCache({
  key: "muiltr",
});

const dir = document.documentElement.dir;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CacheProvider value={dir === "rtl" ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>
);
