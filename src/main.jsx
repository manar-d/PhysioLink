import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./i18n";

import { initDB } from "./mockdb/mockDatabase.js";
import { AuthProvider } from "./context/AuthContext";
import MUIProvider from "./context/MUIProvider.jsx";

// Initialize mock database before app render
initDB();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MUIProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </MUIProvider>
  </StrictMode>,
);
