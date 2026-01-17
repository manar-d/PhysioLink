import { useEffect } from "react";
import { useParams } from "react-router";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  Chip,
  Stack,
  Paper,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import useExercises from "../hooks/useExercises";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useExerciseFormLookups from "../hooks/useExerciseFormLookups";
import usePatient from "../hooks/usePatient";

/* ================== Small UI helpers ================== */

function StatCard({ icon, label, value }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: "#e6e8ef",
        p: 2.5,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            display: "grid",
            placeItems: "center",
            bgcolor: "#eaf7f2",
            color: "#0f766e",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography fontWeight={700} mt={0.3}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

function SectionCard({ icon, title, children }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: "#e6e8ef",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 1.8,
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: "#f6fbf9",
          borderBottom: "1px solid #e6e8ef",
        }}
      >
        <Box sx={{ color: "#0f766e" }}>{icon}</Box>
        <Typography fontWeight={700}>{title}</Typography>
      </Box>

      {/* Body */}
      <Box sx={{ p: 2.5 }}>{children}</Box>
    </Paper>
  );
}

/* ================== Page ================== */

export default function ExerciseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { selectedExercise, loadExerciseDetails, loading, error } =
    useExercises();
  const { difficulties } = useExerciseFormLookups();

  const { selectedExercise: patientSelectedExercise, getExerciseDetails } =
    usePatient();

  const difficultyLabel =
    difficulties.find((d) => d.id === selectedExercise?.difficultyId)?.key ||
    "-";

  const [openImage, setOpenImage] = useState(false);

  const isSpecialist = user?.role === "specialist";
  const isPatient = user?.role === "patient";

  useEffect(() => {
    const loadData = async (exerciseId, userId) => {

    if (id) loadExerciseDetails(exerciseId);
    if (id) getExerciseDetails(exerciseId, userId);
    };

    loadData(id, user?.id);
  }, [id]);

  if (loading)
    return (
      <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" mt={6}>
        {error}
      </Typography>
    );

  if (!selectedExercise) return null;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* ===== HEADER ===== */}
        <Stack spacing={2} mb={3}>
          {selectedExercise.categories &&
            selectedExercise.categories.map((category) => (
              <Chip
                label={category}
                size="small"
                sx={{
                  width: "fit-content",
                  bgcolor: "#0f766e",
                  color: "white",
                  fontWeight: 700,
                  textTransform: "capitalize",
                }}
              />
            ))}

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
                {selectedExercise.title}
              </Typography>

              {selectedExercise.description && (
                <Typography color="text.secondary" mt={1} maxWidth={720}>
                  {selectedExercise.description}
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

        {/* ===== STATS ===== */}
        <Stack
          spacing={{ xs: 2, sm: 2.5 }}
          mb={3}
          direction={{ xs: "column", sm: "row" }}
        >
          <Box sx={{ flex: 1 }}>
            <StatCard
              icon={<AccessTimeIcon />}
              label="Duration"
              value={`${selectedExercise.duration ?? "-"}`}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <StatCard
              icon={<InfoOutlinedIcon />}
              label="Difficulty Level"
              value={difficultyLabel}
            />
          </Box>
        </Stack>

        {/* ===== VIDEO GUIDE ===== */}
        {selectedExercise.video && (
          <Box mb={3}>
            <SectionCard icon={<PlayCircleOutlineIcon />} title="Video Guide">
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid #eceef4",
                  bgcolor: "#000",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "56.25%",
                  }}
                >
                  <Box
                    component="iframe"
                    src={selectedExercise.video}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sx={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                    }}
                  />
                </Box>
              </Box>
            </SectionCard>
          </Box>
        )}

        {/* ===== SPECIALIST NOTES (PATIENT ONLY) ===== */}
        {isPatient && patientSelectedExercise?.notes && (
          <Box mb={3}>
            <SectionCard
              icon={<FormatListBulletedIcon />}
              title="Specialist Notes"
            >
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {patientSelectedExercise.notes}
              </Typography>
            </SectionCard>
          </Box>
        )}

        {/* ===== IMAGE ===== */}
        {/* ===== IMAGE (SMALL + CLICK TO PREVIEW) ===== */}
        {selectedExercise.image && (
          <>
            <Box mb={3}>
              <SectionCard icon={<ImageOutlinedIcon />} title="Exercise Image">
                <Box
                  component="img"
                  src={selectedExercise.image}
                  alt="Exercise"
                  onClick={() => setOpenImage(true)}
                  sx={{
                    width: "100%",
                    maxWidth: 360, // 👈 صارت أصغر
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: "1px solid #eceef4",
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": {
                      opacity: 0.85,
                    },
                  }}
                />
              </SectionCard>
            </Box>

            {/* ===== IMAGE PREVIEW DIALOG ===== */}
            {/* ===== IMAGE PREVIEW (AMAZON STYLE) ===== */}
            <Dialog
              open={openImage}
              onClose={() => setOpenImage(false)}
              maxWidth="md"
              fullWidth
            >
              <Box
                sx={{
                  position: "relative",
                  p: 2,
                }}
              >
                {/* Close Button */}
                <IconButton
                  onClick={() => setOpenImage(false)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Image Container */}
                <Box
                  sx={{
                    width: "100%",
                    height: {
                      xs: 260, // موبايل
                      sm: 360, // تابلت
                      md: 480, // ديسكتوب
                    },
                    // 👈 نفس المربع الأخضر تقريبًا
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f7f7f7",
                    borderRadius: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={selectedExercise.image}
                    alt="Exercise Full"
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
            </Dialog>
          </>
        )}
      </Container>
    </Box>
  );
}
