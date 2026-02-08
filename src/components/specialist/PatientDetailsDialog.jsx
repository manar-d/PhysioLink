import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";

import useLocale from "../../hooks/useLocale";
import useLookups from "../../hooks/useLookups";
import usePatient from "../../hooks/usePatient";



export default function PatientDetailsDialog({ open, patient, onClose }) {
  const { t } = useLocale();
  const { gender } = useLookups();
const { getSinglePatientExercises } = usePatient();

const [exercises, setExercises] = useState([]);
const [loadingExercises, setLoadingExercises] = useState(false);

useEffect(() => {
  if (!open || !patient?.patientId) return;

  const loadExercises = async () => {
    setLoadingExercises(true);
    const data = await getSinglePatientExercises(patient.patientId);
    setExercises(data);
    setLoadingExercises(false);
  };

  loadExercises();
}, [open,patient]);

  if(!patient) return null 
  const genderKey =
    gender.find((g) => String(g.id) === String(patient.gender))?.key || "-";



  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("PatientDetailsDialog.viewTitle")}</DialogTitle>

      <DialogContent dividers>
        {!patient ? (
          <Stack alignItems="center" py={3}>
            <CircularProgress size={24} />
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {t("PatientDetailsDialog.name")}
              </Typography>
              <Typography fontWeight={600}>{patient.name}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                {t("PatientDetailsDialog.age")}
              </Typography>
              <Typography>{patient.age}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                {t("PatientDetailsDialog.gender")}
              </Typography>
              <Typography>
                {genderKey !== "-" ? t(`gender.${genderKey}`) : "-"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                {t("PatientDetailsDialog.phone")}
              </Typography>
              <Typography>{patient.phone}</Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                {t("PatientDetailsDialog.diagnosis")}
              </Typography>
              <Typography>{patient.diagnosis || "-"}</Typography>
            </Box>

<Box mt={3}>
  <Typography fontWeight={600} sx={{ fontSize: 14, mb: 1 }}>
    {t("PatientDetailsDialog.assignedExercises")}
  </Typography>

  {loadingExercises ? (
    <Stack alignItems="center" py={2}>
      <CircularProgress size={20} />
    </Stack>
  ) : exercises.length === 0 ? (
    <Typography color="text.secondary" sx={{ fontSize: 13 }}>
      {t("PatientDetailsDialog.noExercises")}
    </Typography>
  ) : (
    <Stack spacing={2}>
      {exercises.map((ex) => (
        <Box
          key={ex.assignmentId}
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 2,
          }}
        >
          {/* Exercise name */}
          <Box mb={ex.notes ? 1 : 0}>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              {t("PatientDetailsDialog.exercisesName")}
            </Typography>
            <Typography fontWeight={600}>
              {ex.title}
            </Typography>
          </Box>

          {/* Notes */}
          {ex.notes && (
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                {t("PatientDetailsDialog.notes")}
              </Typography>
              <Typography>
                {ex.notes}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  )}
</Box>

          </Stack>

          
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t("Common.close")}</Button>
      </DialogActions>
    </Dialog>
  );
}
