export async function uploadExerciseImage(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "physiolink_unsigned");
  formData.append("folder", "physiolink/exercises");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dall2k1sg/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}