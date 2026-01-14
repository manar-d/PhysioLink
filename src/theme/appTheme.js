import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: document.documentElement.dir || "ltr",

  components: {
    // MuiStack: {
    //   styleOverrides: {
    //     root: ({ theme }) =>
    //       theme.direction === "rtl"
    //         ? { flexDirection: "row-reverse" }
    //         : {},
    //   },
    // },

    // MuiBox: {
    //   styleOverrides: {
    //     root: ({ theme }) =>
    //       theme.direction === "rtl"
    //         ? { direction: "rtl" }
    //         : {},
    //   },
    // },

    // MuiTypography: {
    //   styleOverrides: {
    //     root: ({ theme }) =>
    //       theme.direction === "rtl"
    //         ? { textAlign: "right" }
    //         : {},
    //   },
    // },

    // MuiButton: {
    //   styleOverrides: {
    //     root: ({ theme }) =>
    //       theme.direction === "rtl"
    //         ? { direction: "rtl" }
    //         : {},
    //   },
    // },
  },
});

export default theme;
