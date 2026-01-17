import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UnderConstructionPage from "../components/shared/UnderConstructionPage";
import useHome from "../hooks/useHome";

export default function AllSpecialistsPage() {
  const navigate = useNavigate();
const {allSpecialists} = useHome();

  return (
    <Box>
      <Typography variant="h4">All Specialists</Typography>
      {allSpecialists.map((specialist) => (
        <Button
          key={specialist.id}
          onClick={() => navigate(`/specialists/${specialist.specialistId}`)}
        >
          {specialist.name}
        </Button>
      ))}
      <UnderConstructionPage pageName="All Specialists" />
    </Box>
  );
}
