import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import PatientDashboard from "./pages/patient/PatientDashboard";
import SpecialistDashboard from "./pages/specialist/SpecialistDashboard";
import EditProfile from "./pages/specialist/EditProfile";
import ManageExercises from "./pages/specialist/ManageExercises";
import EditExercise from "./pages/specialist/EditExercise";
import PatientsTab from "./pages/specialist/PatientsTab";
import EditPatient from "./pages/specialist/EditPatient";
import AllExercises from "./pages/exercises/AllExercises";
import AllSpecialists from "./pages/specialists/AllSpecialists";
import SpecialistDetails from "./pages/specialists/SpecialistDetails";
import NewExercise from "./pages/specialist/NewExercise";
import NewPatient from "./pages/specialist/NewPatient";
import LoginPage from "./pages/Login/LoginPage";
import MainLayout from "./layout/MainLayout";

export default function Router() {
  return (
    <Routes>
      {/*  Navbar + Footer */}
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route path="/" element={<Home />} />

        <Route path="/exercises" element={<AllExercises />} />
        <Route path="/specialists" element={<AllSpecialists />} />
        <Route path="/specialists/:id" element={<SpecialistDetails />} />

        {/* Protected Route */}
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/specialist"
          element={
            <PrivateRoute role="specialist">
              <SpecialistDashboard />
            </PrivateRoute>
          }
        >
          <Route path="exercises" element={<ManageExercises />} />
          <Route path="patients" element={<PatientsTab />} />
          <Route path="patients/new" element={<NewPatient />} />
          <Route path="patients/:id/edit" element={<EditPatient />} />
        </Route>

        <Route
          path="/specialist/exercises/new"
          element={
            <PrivateRoute role="specialist">
              
              <NewExercise />
            </PrivateRoute>
          }
        />
        <Route
          path="/specialist/exercises/:id/edit"
          element={
            <PrivateRoute role="specialist">
              
              <EditExercise />
            </PrivateRoute>
          }
        />

        <Route
          path="specialist/edit-profile"
          element={
            <PrivateRoute role="specialist">
              <EditProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/patient"
          element={
            <PrivateRoute role="patient">
              <PatientDashboard />
            </PrivateRoute>
          }
        />
        {/* unavalible Route */}
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
