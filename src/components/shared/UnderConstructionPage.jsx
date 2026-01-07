import { Box, Typography, Container } from "@mui/material";

export default function UnderConstructionPage({ pageName }) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src="/images/under-construction.png"
          alt="Under Construction"
          sx={{
            width: "100%",
            maxWidth: { xs: 260, sm: 360, md: 420 },
            mb: { xs: 3, md: 4 },
            mx: "auto",
            display: "block",
          }}
        />

        {/* Title */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "1.5rem",
              sm: "1.9rem",
              md: "2.2rem",
            },
            mb: 1,
          }}
        >
          I’m working on it  :)
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: {
              xs: "0.95rem",
              sm: "1rem",
            },
            mb: 1,
          }}
        >
          {pageName ? (<Typography component="span" fontWeight={700}> {pageName} page </Typography>) : "This"} is currently under construction.
        </Typography>

        <Typography
          sx={{
            color: "text.disabled",
            fontSize: "0.85rem",
          }}
        >
          Thank you for your patience.
        </Typography>
      </Box>
    </Box>
  );
}
