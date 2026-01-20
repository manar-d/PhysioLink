import { Box, Avatar, Typography, Stack, Paper } from "@mui/material";

import useSpecialist from "../../hooks/useSpecialist";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import useLocale from "../../hooks/useLocale";

export default function SpecialistProfileHeader() {
  const { t } = useLocale();
  const { user } = useAuthContext();

  const { getSpecialistDetails, specialistDetails, loading, error } =
    useSpecialist();

  // load specialist data
  useEffect(() => {
    if (!user?.id) return;
    getSpecialistDetails(user.id);
  }, [user?.id]);

  if (loading) {
    return (
      <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography>Loading...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  const specialtyKey = specialistDetails?.specialty;
  const years = specialistDetails?.experience;

  return (
    <Paper
      sx={{
        p: { xs: 2.5, md: 4 },
        borderRadius: 3,
        mb: 4,
        backgroundColor: "#fbfbfcff",
      }}
    >
      <Stack direction="row" spacing={{ xs: 2, md: 4 }} alignItems="flex-start">
        {/* Avatar */}
        {specialistDetails?.image ? (
          <Avatar
            src={specialistDetails.image}
            alt={specialistDetails.name}
            sx={{
              width: { xs: 90, sm: 110, md: 130 },
              height: { xs: 90, sm: 110, md: 130 },
            }}
          />
        ) : (
          <Avatar
            src="/images/profile.jpg"
            sx={{
              width: { xs: 56, md: 80 },
              height: { xs: 56, md: 80 },
            }}
          />
        )}

        {/* Info */}
        <Box flex={1}>
          {/* Name */}
          <Typography
            fontWeight={600}
            sx={{
              fontSize: { xs: 16, md: 20 },
              lineHeight: 1.3,
            }}
          >
            {specialistDetails?.name}
          </Typography>

          {/* Specialty */}
          {specialtyKey && (
            <Typography
              color="text.secondary"
              sx={{ fontSize: { xs: 13, md: 14 } }}
            >
              {t(`specialty.${specialtyKey}`)}
            </Typography>
          )}

          {/* Experience (Desktop only) */}
          {years && (
            <Typography
              color="text.secondary"
              sx={{
                fontSize: 13,
                display: { xs: "none", md: "block" },
              }}
            >
              {t("SpecialistProfileHeader.experience", { years })}
            </Typography>
          )}

          {/* Description (Desktop only) */}
          {specialtyKey && (
            <Typography
              sx={{
                mt: 1,
                maxWidth: 520,
                fontSize: 13,
                lineHeight: 1.6,
                color: "text.secondary",
                display: { xs: "none", md: "block" },
              }}
            >
              {specialistDetails?.bio}
            </Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}
