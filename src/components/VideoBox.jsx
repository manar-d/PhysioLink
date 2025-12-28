import { Box } from "@mui/material";

export default function VideoBox() {
  const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  const videoId = url?.split("v=")[1];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        aspectRatio: "16 / 9",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      {videoId && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
        />
      )}
    </Box>
  );
}
