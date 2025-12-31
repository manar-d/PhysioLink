import { useParams } from "react-router";

export default function SpecialistDetails() {
  const { id } = useParams();
  const specialistId = id;

  return (
    <>
      <h1>SpecialistDetails {specialistId} </h1>
    </>
  );
}
