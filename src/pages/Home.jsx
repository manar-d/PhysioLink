import ExercisesSection from "../components/home/ExercisesSection";
import HeroSection from "../components/home/HeroSection";
import SpecialistsSection from "../components/home/SpecialitstsSection";

export default function Home() {
  return (
    <>
      {/*  Hero Section  */}
      <HeroSection />

      {/*  Specialists Section  */}
      <SpecialistsSection />

      {/*  Exercises Section */}
      <ExercisesSection />
    </>
  );
}
