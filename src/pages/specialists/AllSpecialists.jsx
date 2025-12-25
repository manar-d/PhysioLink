import { useNavigate } from "react-router-dom";

export default function AllSpecialists() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>All Specialists</h2>

      <div onClick={() => navigate("/specialists/1")}>
        Dr. Ahmed
      </div>
    </div>
  );
}
