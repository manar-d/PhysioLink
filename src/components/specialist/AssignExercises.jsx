import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Paper,
  Container,
  Alert,
  IconButton,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import useExercises from "../../hooks/useExercises";
import usePatientExercises from "../../hooks/usePatientExercises";
import useAuth from "../../hooks/useAuth";

export default function AssignExercises() {
  const { patientId } = useParams(); // this is patients.id
  const navigate = useNavigate();

  const { user } = useAuth(); // specialist (users.id)

  const { exercises } = useExercises();
  const { assignExercise, loading, error } = usePatientExercises();

  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [assignedExercises, setAssignedExercises] = useState([]);

  const selectedExercise = exercises.find(
    (e) => String(e.id) === String(selectedExerciseId)
  );

  const isAlreadyAdded = assignedExercises.some(
    (x) => x.exerciseId === selectedExercise?.id
  );

  const handleAdd = () => {
    if (!selectedExercise) return;
    if (isAlreadyAdded) return;

    setAssignedExercises((prev) => [
      ...prev,
      { exerciseId: selectedExercise.id, notes: "" },
    ]);

    setSelectedExerciseId("");
  };

  const handleUpdateNotes = (index, value) => {
    setAssignedExercises((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], notes: value };
      return copy;
    });
  };

  const handleRemove = (index) => {
    setAssignedExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!user?.id) return;

    for (const item of assignedExercises) {
      await assignExercise({
        patientId,
        exerciseId: item.exerciseId,
        specialistId: user.id,
        notes: item.notes,
      });
    }

    navigate("/specialist");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Assign Exercises 
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Select exercise */}
        <TextField
          select
          label="Choose Exercise"
          fullWidth
          value={selectedExerciseId}
          onChange={(e) => setSelectedExerciseId(e.target.value)}
        >
          {exercises.map((ex) => (
            <MenuItem key={ex.id} value={String(ex.id)}>
              {ex.title}
            </MenuItem>
          ))}
        </TextField>

        {selectedExercise && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            {selectedExercise.description}
          </Typography>
        )}

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          startIcon={<AddIcon />}
          disabled={!selectedExercise || isAlreadyAdded}
          onClick={handleAdd}
        >
          Add to plan
        </Button>

        {/* Assigned exercises */}
        <Stack spacing={2} mt={4}>
          {assignedExercises.length === 0 ? (
            <Typography color="text.secondary">
              No exercises added yet.
            </Typography>
          ) : (
            assignedExercises.map((item, index) => {
              const ex = exercises.find((e) => e.id === item.exerciseId);

              return (
                <Box
                  key={`${item.exerciseId}-${index}`}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Stack spacing={1.5}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight="bold">{ex?.title}</Typography>

                      <IconButton
                        color="error"
                        onClick={() => handleRemove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>

                    <TextField
                      label="Notes for patient"
                      multiline
                      rows={2}
                      fullWidth
                      value={item.notes}
                      onChange={(e) => handleUpdateNotes(index, e.target.value)}
                    />
                  </Stack>
                </Box>
              );
            })
          )}
        </Stack>

        {/* Actions */}
        <Stack direction="row" spacing={2} mt={4}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/specialist")}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            fullWidth
            disabled={assignedExercises.length === 0 || loading}
            onClick={handleSave}
          >
            {loading ? "Saving..." : "Save Plan"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
