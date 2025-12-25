import { useEffect, useState } from "react";
import {
  getPatientExercises,
  getPatientExerciseById,
} from "../../api/patient.api";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


export default function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});

  useEffect(() => {
    async function loadData() {
      const res = await getPatientExercises(user.id);
      setExercises(res.data);

      const res2 = await getPatientExerciseById(user.id, 2);
      setSelectedExercise(res2.data);
    }

    loadData();
  }, [user.id]);



  console.log("user in patient dashboard:", user);
  return (
    <div>
         
      <h2>Welcome {user.name} ! </h2>
      <ul>
        {exercises.map((e) => (
          <li key={e.id}>
            
            exercise name : {e.title} | note : {e.notes}
          </li>
        ))}
      </ul>

      {
        <p key={selectedExercise.id}>
          
          exercise name details : {selectedExercise.title}
        </p>
      }
    </div>
  );
}
