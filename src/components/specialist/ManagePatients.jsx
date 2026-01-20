import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocale from "../../hooks/useLocale";

import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import usePatient from "../../hooks/usePatient";

export default function ManagePatients() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { patients, removePatient } = usePatient();

  // Delete confirmation
  const [openConfirm, setOpenConfirm] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  // Snackbar state
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | info
  });

  const showSnack = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  // Open delete dialog
  const handleOpenDelete = (id) => () => {
    setPatientToDelete(id);
    setOpenConfirm(true);
  };

  // Confirm delete action
  const handleConfirmDelete = async () => {
    const success = await removePatient(patientToDelete);

    if (success) {
      showSnack(t("ManagePatients.deletedSuccess"), "success");
    } else {
      showSnack(t("ManagePatients.deletedError"), "error");
    }

    setOpenConfirm(false);
    setPatientToDelete(null);
  };

  return (
    <Box>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography fontWeight={600} sx={{ fontSize: 18 }}>
            {t("ManagePatients.title")}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 13 }}>
            {t("ManagePatients.subtitle")}
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/specialist/patients/new")}
        >
          {t("ManagePatients.addPatient")}
        </Button>
      </Stack>

      {/*  Patients Cards  */}
      <Stack spacing={2.5}>
        {patients.length === 0 ? (
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            {t("ManagePatients.empty")}
          </Paper>
        ) : (
          patients.map((patient) => (
            <Paper
              key={patient.id}
              sx={{
                p: 2.5,
                borderRadius: 3,
                transition: "0.2s",
                "&:hover": {
                  boxShadow: 3,
                  borderColor: "primary.light",
                },
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                {/* Patient info */}
                <Box flex={1}>
                  <Typography fontWeight={600} sx={{ fontSize: 14 }}>
                    {patient.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                    {patient.diagnosis}
                  </Typography>
                </Box>

                {/* Actions */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<FitnessCenterIcon />}
                    onClick={() =>
                      navigate(`/specialist/assign-exercises/${patient.id}`)
                    }
                    sx={{
                      textTransform: "none",
                      px: { xs: 1, sm: 2 },
                      minWidth: { xs: 40, sm: "auto" },
                    }}
                  >
                      {t("ManagePatients.assignExercises")}
                  </Button>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={handleOpenDelete(patient.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          ))
        )}
      </Stack>

      {/* Delete confirmation dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>{t("ManagePatients.deleteDialogTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("ManagePatients.deleteDialogMessage")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>
            {t("Common.cancel")}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            {t("Common.delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
