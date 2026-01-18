import { Box, Typography, Stack, Button, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function ExerciseHeader({ exercise, isSpecialist, categories }) {
  return (
    <Stack spacing={2} mb={3}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
      >
        <Box>
          <Typography
            fontWeight={800}
            sx={{
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
                md: "3rem",
              },
              letterSpacing: -0.5,
            }}
          >
            {exercise.title}

          </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
      >

          
            {categories &&
              categories.map((category, i) => (
                <Chip
                  key={i}
                  label={category}
                  size="small"
                  sx={{
                    width: "fit-content",
                    bgcolor: "#0f766e",
                    color: "white",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    mx: 0.5,
                  }}
                />
              ))}
</Stack>

          {exercise.description && (
            <Typography color="text.secondary" mt={1} maxWidth={720}>
              {exercise.description}
            </Typography>
          )}
        </Box>

        {isSpecialist && (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              bgcolor: "#0f766e",
              "&:hover": { bgcolor: "#0b5f58" },
              borderRadius: 2.5,
              px: 2.5,
              height: 44,
            }}
          >
            Edit Exercise
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
