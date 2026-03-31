import { createBrowserRouter } from "react-router";
import { Root } from "./screens/Root";
import { SplashScreen } from "./screens/SplashScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { Dashboard } from "./screens/Dashboard";
import { EmergencyRequest } from "./screens/EmergencyRequest";
import { LiveTracking } from "./screens/LiveTracking";
import { HospitalList } from "./screens/HospitalList";
import { VolunteerPanel } from "./screens/VolunteerPanel";
import { Profile } from "./screens/Profile";
import { AdminDashboard } from "./screens/AdminDashboard";
import { ProtocolGuide } from "./screens/ProtocolGuide";
import { NotFound } from "./screens/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: SplashScreen },
      { path: "login", Component: LoginScreen },
      { path: "dashboard", Component: Dashboard },
      { path: "emergency/new", Component: EmergencyRequest },
      { path: "emergency/:id/tracking", Component: LiveTracking },
      { path: "hospitals", Component: HospitalList },
      { path: "volunteer", Component: VolunteerPanel },
      { path: "profile", Component: Profile },
      { path: "admin", Component: AdminDashboard },
      { path: "protocols", Component: ProtocolGuide },
      { path: "*", Component: NotFound },
    ],
  },
]);
