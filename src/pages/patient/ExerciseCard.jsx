import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";


export default function ExerciseCard({exercises}) {
  return (
            {exercises.map((exercise) => (
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
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={exercise.image}
                  alt={exercise.title}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: 280,
                    },
                    height: {
                      xs: 180, // const for mobile
                      sm: "auto",
                    },
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                {/* Content */}
                <CardContent
                  sx={{
                    flex: 1,
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {exercise.title}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    {exercise.description}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      borderRadius: 3,
                    }}
                  >
                    View Exercise Details
                  </Button>
                </CardContent>
              </Card>
            ))}
  )
}
