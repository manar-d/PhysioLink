import { Box } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SectionCard from "./SectionCard";
import useLocale from "../../hooks/useLocale";

export default function ExerciseVideo({ video }) {
  const { t } = useLocale();

  if (!video) return null;

  return (
          <Box mb={3}>
            <SectionCard icon={<PlayCircleOutlineIcon />}
        title={t("ExerciseDetails.videoGuide")}
            >
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
                    src={video}
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
  );
}