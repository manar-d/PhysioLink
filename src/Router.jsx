import { Routes, Route } from "react-router-dom";
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

export default function Router() {
  return (
    <Routes>
      {/*  Navbar + Footer  */}
      <Route element={<MainLayout />}>
        {/* Public */}
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
            <PrivateRoute role="specialist">
              <SpecialistDashboard />
            </PrivateRoute>
          }
        />
        {/* specialist role -----> patients/new (not use yet) */}
        <Route
          path="/specialist/patients/new"
          element={
            <PrivateRoute role="specialist">
              <NewPatient />
            </PrivateRoute>
          }
        />
        {/* specialist role -----> patients/new (not use yet) */}
        <Route
          path="/specialist/patients/:id/edit"
          element={
            <PrivateRoute role="specialist">
              <EditPatient />
            </PrivateRoute>
          }
        />
        {/* specialist role -----> exercises/new */}

        <Route
          path="/specialist/exercises/new"
          element={
            <PrivateRoute role="specialist">
              <NewExercise />
            </PrivateRoute>
          }
        />
        {/* specialist role -----> exercises/:id/edit */}
        <Route
          path="/specialist/exercises/:id/edit"
          element={
            <PrivateRoute role="specialist">
              <EditExercise />
            </PrivateRoute>
          }
        />
        {/* specialist role -----> edit-profile (not use yet) */}
        <Route
          path="specialist/edit-profile"
          element={
            <PrivateRoute role="specialist">
              <EditProfile />
            </PrivateRoute>
          }
        />

        {/* patient role */}
        <Route
          path="/patient"
          element={
            <PrivateRoute role="patient">
              <PatientDashboard />
            </PrivateRoute>
          }
        />

        {/* unavailable Route */}
        <Route
          path="*"
          element={
            <h1 style={{ padding: "50px" }}>
              <b> Sorry </b> :( <br /> Page Not Found (Error 404) !
            </h1>
          }
        />
      </Route>
    </Routes>
  );
}
