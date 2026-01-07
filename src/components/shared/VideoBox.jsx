import { Box } from "@mui/material";

export default function VideoBox({ url }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        aspectRatio: "16 / 9",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        position: "relative",
        pointerEvents: "none",
      }}
    >
      <iframe
        src={url || "https://www.youtube.com/embed/40GmRsYyzBk"}
        title="exercise-video"
        allowFullScreen
        style={{
          width: "100%",
          height: "100%",
          border: 0,
          pointerEvents: "auto",//Revert the action to the video only
        }}
      />
    </Box>
  );
}
