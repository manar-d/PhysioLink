import { createTheme } from "@mui/material/styles";

const theme = createTheme(
  {  direction: document.documentElement.dir || "ltr",}
//   {
//   direction: document.documentElement.dir || "ltr",

//     // MuiStack: {
//     //   styleOverrides: {
//     //     root: ({ theme }) =>
//     //       theme.direction === "rtl"
//     //         ? { flexDirection: "row-reverse" }
//     //         : {},
//     //   },
//     // },

//     // MuiBox: {
//     //   styleOverrides: {
//     //     root: ({ theme }) =>
//     //       theme.direction === "rtl"
//     //         ? { direction: "rtl" }
//     //         : {},
//     //   },
//     // },

//     // MuiTypography: {
//     //   styleOverrides: {
//     //     root: ({ theme }) =>
//     //       theme.direction === "rtl"
//     //         ? { textAlign: "right" }
//     //         : {},
//     //   },
//     // },

//     // MuiButton: {
//     //   styleOverrides: {
//     //     root: ({ theme }) =>
//     //       theme.direction === "rtl"
//     //         ? { direction: "rtl" }
//     //         : {},
//     //   },
//     // },

    
//   palette: {
//     primary: {
//       main: "#259687",     //base color
//       light: "#4ebda9",
//       dark: "#1b786d",
//       contrastText: "#fff"
//     },
//     secondary: {
//       main: "#FF8A65",     // secondary color
//       contrastText: "#000",
//     },
//     background: {
//       default: "#F5F7FA",  // خلفيات عامة
//       paper: "#ffffff"
//     },
//     text: {
//       primary: "#212121",
//       secondary: "#6B6B6B",
//     },
//   },

//   typography: {
//     fontFamily: "Roboto, Arial, sans-serif",
//     h1: {
//       fontSize: "2.25rem",
//       fontWeight: 700,
//     },
//     h2: {
//       fontSize: "2rem",
//       fontWeight: 600,
//     },
//     body1: {
//       fontSize: "1rem",
//       fontWeight: 400,
//     },
//     button: {
//       textTransform: "none",
//       fontWeight: 600,
//     },
//   },

//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: "4px",
//           padding: "12px 20px",
//         },
//       },
//     },
//     MuiTextField: {
//       defaultProps: {
//         variant: "outlined",
//       },
//     },
//   },

//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   }

  
// }
);

export default theme;
