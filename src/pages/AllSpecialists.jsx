import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UnderConstructionPage from "../components/shared/UnderConstructionPage";

export default function AllSpecialists() {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4">All Specialists</Typography>
      <Button onClick={() => navigate("/specialists/1")}>
        PT. Ahmed
      </Button>
      <Button onClick={() => navigate("/specialists/2")}>
        PT. Munira
      </Button>
      <UnderConstructionPage pageName="All Specialists" />
    </Box>
  );
}
