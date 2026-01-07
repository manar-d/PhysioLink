import { useParams } from "react-router";
import UnderConstructionPage from "../components/shared/UnderConstructionPage";

export default function SpecialistDetails() {
  const { id } = useParams();
  const specialistId = id;

  return (
      <UnderConstructionPage pageName={`SpecialistDetails ${specialistId}`} />
  );
}
