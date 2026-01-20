import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import useLocale from "../../hooks/useLocale";
import useHome from "../../hooks/useHome";

export default function ExercisesSection() {
  const { homeExercises } = useHome(); // TODO: handle loading & error states
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <Box sx={{ bgcolor: "#f7f9fb", py: 8 }}>
      <Container>
        {/* HEADER */}
        <Stack
          direction="column"
          alignItems={{ xs: "center", md: "flex-start" }}
          spacing={1}
          mb={4}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Typography variant="h5" fontWeight={700}>
            {t("ExercisesSection.title")}
          </Typography>
          <Typography color="text.secondary">
            {t("ExercisesSection.subtitle")}
          </Typography>
        </Stack>

        {/* CARDS */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {homeExercises.map((exercise) => (
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
              {/* IMAGE */}
              <Box sx={{ position: "relative", height: 220 }}>
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
                    <PlayArrowIcon sx={{ fontSize: 40, color: "#fff" }} />
                  </IconButton>
                </Box>
              </Box>

              {/* CONTENT */}
              <CardContent>
                <Stack direction="row" spacing={1} mb={1}>
                  <Box>
                  {t("ExercisesSection.title")}
                  </Box>
                  <Chip
                 sx={{mx:2}}
                    size="small"
                    label={t("Common.duration", {
                      time: exercise.duration ?? "-",
                    })}
                  />
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
