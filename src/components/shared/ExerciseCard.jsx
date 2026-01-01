import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function ExerciseCard({
  exercises = [],
  mode = "patient",
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <>
      {/* Empty state */}

      {exercises.length === 0 ? (
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          No exercises found.{" "}
          {mode === "specialist" && "Please add some exercises."}
        </Paper>
      ) : (
        exercises.map((exercise) => (
          <Card
            key={exercise.id}
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column", // mobile
                sm: "row", // desktop
              },
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            {/* Exercise image */}

            <Box
              component="img"
              src={
                exercise.image ||
                "https://columbiaclinic.us/wp-content/uploads/2020/11/physical-therapy.jpg"
              }
              alt={exercise.title}
              sx={{
                width: {
                  xs: "100%",
                  sm: 260,
                },
                height: {
                  xs: 180,
                  sm: "auto",
                },
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            {/* exercise Content */}

            <CardContent sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" fontWeight={600}>
                {exercise.title}
              </Typography>

              {exercise.description && (
                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    mb: 2,
                    display: "-webkit-box", //for long text
                    WebkitLineClamp: 2, // splite to two
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {exercise.description}
                </Typography>
              )}

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                {/* View details Button */}

                <Button
                  variant="contained"
                  size="small"
                  sx={{ borderRadius: 3, textTransform: "none" }}
                  onClick={() => navigate(`/exercises/${exercise.id}`)}
                >
                  View Exercise Details
                </Button>

                {/* Specialist actions */}

                {mode === "specialist" && (
                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        navigate(`/specialist/exercises/${exercise.id}/edit`)
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      color="error"
                      onClick={onDelete?.(exercise.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
}
