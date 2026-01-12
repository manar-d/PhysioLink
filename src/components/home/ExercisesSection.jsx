import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import useHome from "../../hooks/useHome";

export default function ExercisesSection() {
  const { allExercises } = useHome(); //TODO: deal with loading and error states
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#f7f9fb", py: 8 }}>
      <Container>
        {/* HEADER */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "center", md: "flex-end" }}
          justifyContent="space-between"
          spacing={2}
          mb={4}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Featured Exercises
            </Typography>
            <Typography color="text.secondary">
              Explore our library of guided exercises with detailed
              instructions.
            </Typography>
          </Box>

          <Button
            sx={{
              mt: { xs: 1, md: 0 },
              color: "#259687ff",
              "&:hover": {
                color: "#ffffffff",
                backgroundColor: "#259687ff",
              },
            }}
            endIcon={<ChevronRightIcon />}
          >
            View All Exercises
          </Button>
        </Stack>

        {/* CARDS */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {allExercises.map((exercise) => (
            <Card
              key={exercise.id}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
                "&:hover .overlay": {
                  opacity: 1,
                },
                "&:hover .playIcon": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              }}
              onClick={() => navigate(`/exercises/${exercise.id}`)}
            >
              {/* IMAGE + OVERLAY */}
              <Box sx={{ position: "relative", height: 220, flexShrink: 0 }}>
                <Box
                  component="img"
                  src={exercise.image}
                  alt={exercise.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "0.3s",
                  }}
                >
                  <IconButton
                    className="playIcon"
                    sx={{
                      bgcolor: "#259687ff",
                      transform: "scale(0.8)",
                      opacity: 0,
                      transition: "0.3s",
                      "&:hover": {
                        bgcolor: "#259687ff",
                      },
                    }}
                  >
                    <PlayArrowIcon sx={{ fontSize: 40, color: "#ffffffff" }} />
                  </IconButton>
                </Box>
              </Box>

              {/* CONTENT */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={1} mb={1}>
                  {exercise.categories &&
                    exercise.categories.map((category) => (
                      <Chip key={category} size="small" label={category} />
                    ))}
                  <Chip size="small" label={exercise.duration} />
                </Stack>

                <Typography fontWeight={700} gutterBottom>
                  {exercise.title}
                </Typography>
                <Typography
                  fontSize={14}
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {exercise.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
