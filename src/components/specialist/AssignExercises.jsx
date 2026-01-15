import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import useExercises from "../../hooks/useExercises";
import usePatientExercises from "../../hooks/usePatientExercises";
import useAuth from "../../hooks/useAuth";

export default function AssignExercises() {
  const { patientId } = useParams();
  const { user } = useAuth(); // specialist
  const { exercises } = useExercises();
  const { assignExercise, loading, error } = usePatientExercises();

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleAssign = async () => {
    if (!selectedExercise) return;

    await assignExercise({
      patientId: patientId,
      exerciseId: selectedExercise.id,
      specialistId: user.id,
      notes,
    });

    setNotes("");
    alert("Exercise assigned successfully");
    navigate(`/specialist`);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Assign Exercise
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Stack spacing={2}>
        {exercises.map((ex) => (
          <Card
            key={ex.id}
            sx={{
              cursor: "pointer",
              border:
                selectedExercise?.id === ex.id
                  ? "2px solid #1976d2"
                  : "1px solid #ddd",
            }}
            onClick={() => setSelectedExercise(ex)}
          >
            <CardContent>
              <Typography fontWeight="bold">
                {ex.title}
              </Typography>
              <Typography variant="body2">
                {ex.description}
              </Typography>
            </CardContent>
          </Card>
        ))}

        <TextField
          label="Notes for patient"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={3}
        />

        <Button
          variant="contained"
          disabled={!selectedExercise || loading}
          onClick={handleAssign}
        >
          Assign Exercise
        </Button>
      </Stack>
    </Box>
  );
}
