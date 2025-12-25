import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PatientsTab() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients([
      { id: 1, name: "Patient A", condition: "Post Surgery Rehab" },
      { id: 2, name: "Patient B", condition: "Knee Pain" },
    ]);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients((prev) => prev.filter((p) => p.id !== id));
    }
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
        {patients.map((patient) => (
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
                onClick={() => handleDelete(patient.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}