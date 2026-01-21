import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./i18n";
import "leaflet/dist/leaflet.css";
import { initDB } from "./mockdb/mockDatabase.js";
import { AuthProvider } from "./context/AuthContext";
import MUIProveider from "./context/MUIProveider.jsx";

initDB();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MUIProveider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </MUIProveider>
  </StrictMode>,
);
