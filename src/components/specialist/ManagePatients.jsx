import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import usePatient from "../../hooks/usePatient";

export default function ManagePatients() {
  const navigate = useNavigate();
  const { patients ,removepatient} = usePatient();

  // Delete confirmation state
  const [openConfirm, setOpenConfirm] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  // Open delete dialog
  const handleOpenDelete = (id) => () => {
    setPatientToDelete(id);
    setOpenConfirm(true);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    // TODO: call delete patient & use patientToDelete as parameter
    removepatient(patientToDelete);
    setOpenConfirm(false);
    setPatientToDelete(null);
  };

  return (
    <Box>
      {/*  Header  */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography fontWeight={600} sx={{ fontSize: 18 }}>
            My Patients
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 13 }}>
            Manage and follow up your patients
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/specialist/patients/new")}
        >
          Add Patient
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
            No patients found. Please add new patients.
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
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar />

                <Box flex={1}>
                  <Typography fontWeight={600} sx={{ fontSize: 14 }}>
                    {patient.name}
                  </Typography>

                  <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                    {patient.condition}
                  </Typography>
                </Box>

                {/* Actions */}
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() =>
                    navigate(`/specialist/patients/${patient.id}/edit`)
                  }
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  color="error"
                  onClick={handleOpenDelete(patient.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Paper>
          ))
        )}
      </Stack>

      {/* Delete confirmation dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Delete Exercise</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this exercise?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
