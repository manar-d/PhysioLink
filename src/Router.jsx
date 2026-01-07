import { Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AllExercises from "./pages/AllExercises";
import AllSpecialists from "./pages/AllSpecialists";
import SpecialistDetails from "./pages/SpecialistDetails";
import ExerciseDetails from "./pages/ExerciseDetails";
import PatientDashboard from "./pages/PatientDashboard";
import SpecialistDashboard from "./pages/SpecialistDashboard";

//components
import PrivateRoute from "./components/shared/PrivateRoute";
import EditProfile from "./components/specialist/EditProfile";
import EditExercise from "./components/specialist/EditExercise";
import EditPatient from "./components/specialist/EditPatient";
import NewExercise from "./components/specialist/NewExercise";
import NewPatient from "./components/specialist/NewPatient";
import NotFound from "./pages/NotFoundPage";
import { ROLE_PATIENT, ROLE_SPECIALIST } from "./auth.constants";

export default function Router() {
  return (
    <Routes>
      {/*  Navbar + Footer  */}
      <Route element={<MainLayout />}>
        {/* ------------ Public Route ------------ */}
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<AllExercises />} />
        <Route path="/exercises/:id" element={<ExerciseDetails />} />

        <Route path="/specialists" element={<AllSpecialists />} />
        <Route path="/specialists/:id" element={<SpecialistDetails />} />

        <Route path="/login" element={<LoginPage />} />

        {/* ------------ Protected Route ------------ */}
        {/* specialist role */}
        <Route
          path="/specialist"
          element={
            <PrivateRoute role={ROLE_SPECIALIST}>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route path="" element={<SpecialistDashboard />} />
          <Route path="patients/new" element={<NewPatient />} />
          <Route path="patients/:id/edit" element={<EditPatient />} />
          <Route path="exercises/new" element={<NewExercise />} />
          <Route path="exercises/:id/edit" element={<EditExercise />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>

        {/* patient role */}
        <Route
          path="/patient"
          element={
            <PrivateRoute role={ROLE_PATIENT}>
              <PatientDashboard />
            </PrivateRoute>
          }
        />

        {/* unavailable Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
