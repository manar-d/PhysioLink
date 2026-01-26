import { Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SpecialistDetails from "./pages/SpecialistDetails";
import ExerciseDetails from "./pages/ExerciseDetails";
import PatientDashboard from "./pages/PatientDashboard";
import SpecialistDashboard from "./pages/SpecialistDashboard";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AboutPage from "./pages/Aboutpage";
import NotFound from "./pages/NotFoundPage";

import PrivateRoute from "./components/shared/PrivateRoute";
import EditExercise from "./components/specialist/EditExercise";
import NewExercise from "./components/specialist/NewExercise";
import NewPatient from "./components/specialist/NewPatient";
import AssignExercises from "./components/specialist/AssignExercises";

import { ROLE_PATIENT, ROLE_SPECIALIST } from "./constants/auth.constants";

export default function Router() {
  return (
    <Routes>
      {/*  Navbar + Footer  */}
      <Route element={<MainLayout />}>
        {/* ------------ Public Route ------------ */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/exercises/:id" element={<ExerciseDetails />} />

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
          <Route path="exercises/new" element={<NewExercise />} />
          <Route path="exercises/:id/edit" element={<EditExercise />} />
          <Route path="assign-exercises/:id" element={<AssignExercises />} />
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

        <Route
          path="/reset-password"
          element={
            <PrivateRoute>
              <ResetPasswordPage />
            </PrivateRoute>
          }
        />

        {/* unauthorized Route */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* unavailable Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
