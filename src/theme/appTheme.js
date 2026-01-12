import { createTheme } from "@mui/material/styles";
import i18n from "../i18n";

const getDirection = () => {
  const rtlLangs = ["ar", "ur"];
  return rtlLangs.includes(i18n.language) ? "rtl" : "ltr";
};

const theme = createTheme({
  direction: getDirection(),

  palette: {
    mode: "light",
  },

  typography: {
    fontFamily: "Cairo, Roboto, sans-serif",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
