import { useState } from "react";
import { Box, Dialog, IconButton } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SectionCard from "./SectionCard";

export default function ExerciseImage({ image }) {
  const [openImage, setOpenImage] = useState(false);
  if (!image) return null;

  return (
    <>
      <Box mb={3}>
        <SectionCard icon={<ImageOutlinedIcon />} title="Exercise Image">
          <Box
            component="img"
            src={image}
            alt="Exercise"
            onClick={() => setOpenImage(true)}
            sx={{
              width: "100%",
              maxWidth: 360,
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

      {/*  IMAGE PREVIEW DIALOG  */}
      {/*  IMAGE PREVIEW (AMAZON STYLE)  */}
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
                xs: 260,
                sm: 360,
                md: 480,
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#f7f7f7",
              borderRadius: 1,
            }}
          >
            <Box
              component="img"
              src={image}
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
  );
}
