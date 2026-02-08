import { createTheme } from "@mui/material/styles";

const baseTheme = {
  palette: {
    primary: {
      main: "#259687",
      light: "#4ebda9",
      dark: "#1b786d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#65afff",
      contrastText: "#000",
    },
    text: {
      primary: "#212121",
      secondary: "#6B6B6B",
    },
  },

  typography: {
    button: {
      textTransform: "none",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
      },
    },
  },
};

const theme = createTheme({
  ...baseTheme,
  direction: "ltr",
});

const rtlTheme = createTheme({
  ...baseTheme,
  direction: "rtl",
});

export { theme, rtlTheme };
