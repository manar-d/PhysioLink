import { useEffect, useState } from "react";

export default function useExerciseImage({ initialImage = "" } = {}) {
  const [imageUrl, setImageUrl] = useState(initialImage);

  // sync when initialImage changes
  useEffect(() => {
    setImageUrl(initialImage);
  }, [initialImage]);

  const openWidget = () => {
    if (!window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dall2k1sg",
        apiKey: "991461478922643", // API KEY
        uploadPreset: "physiolink_unsigned",
        folder: "physiolink/exercises",
        sources: ["local"],
        multiple: false,
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );

    widget.open();
  };

  return {
    imageUrl,
    openWidget,
  };
}
