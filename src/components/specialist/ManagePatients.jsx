import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocale from "../../hooks/useLocale";

import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import VisibilityIcon from "@mui/icons-material/Visibility";

import usePatient from "../../hooks/usePatient";
import EmptyPaper from "../shared/EmptyPaper";
import PatientDetailsDialog from "./PatientDetailsDialog";

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

  //dialog state
  const [openView, setOpenView] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

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

  const handleOpenView = (patient) => {
    setSelectedPatient(patient);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedPatient(null);
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
          <EmptyPaper message={t("ManagePatients.empty")} />
        ) : (
          patients.map((patient) => (
            <Card
              key={patient.id}
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #e0e0e0",
                transition: "0.2s",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <CardContent sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
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

                    <Typography sx={{ fontSize: 13 }}>
                      {t("ManagePatients.phone")}: {patient.phone}
                    </Typography>

                    <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                      {t("ManagePatients.diagnosis")}:{patient.diagnosis || "-"}
                    </Typography>
                  </Box>

                  {/* Actions */}

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon sx={{ fontSize: 18 }} />}
                      onClick={() => handleOpenView(patient)}
                      sx={{
                        height: 36,
                        fontSize: 13,
                        px: 1.5,
                        textTransform: "none",
                      }}
                    >
                       {t("ManagePatients.view")}
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<FitnessCenterIcon sx={{ fontSize: 18 }} />}
                      onClick={() =>
                        navigate(
                          `/specialist/assign-exercises/${patient.patientId}`,
                        )
                      }
                      sx={{
                        height: 36,
                        fontSize: 13,
                        px: 2.5,
                        textTransform: "none",
                        boxShadow: 1,
                      }}
                    >
                     {t("ManagePatients.assignExercises")}
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={handleOpenDelete(patient.id)}
                    >
                      <DeleteIcon fontSize="small" />{" "}
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
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
      {/* Patient Details Dialog */}
      <PatientDetailsDialog
        open={openView}
        patient={selectedPatient}
        onClose={handleCloseView}
      />
    </Box>
  );
}
