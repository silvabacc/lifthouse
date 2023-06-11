import { Routine } from "@backend/data";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Verify from "./pages/Authentication/Verify";
import Home from "./pages/Home/Home";
import Workout from "./pages/Workout/Workout";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import PasswordReset from "./pages/Authentication/PasswordReset";

const guardRoutes = (
  element: JSX.Element,
  isAuthenticated: boolean,
  navigateTo?: string
) => {
  return isAuthenticated ? element : <Navigate to={navigateTo || "/"} />;
};

const authRoute = (
  element: JSX.Element,
  isAuthenticated: boolean,
  navigateTo?: string
) => {
  return isAuthenticated ? <Navigate to={navigateTo || "/home"} /> : element;
};

//v6 react-router-dom removed regex support, so must statically route these
export const createRoutes = (isAuthenticated: boolean) => {
  const workoutRoutes = [
    { routeSegment: "upper_intensity", prop: Routine.UPPER_INTENSITY },
    { routeSegment: "upper_volume", prop: Routine.UPPER_VOLUME },
    { routeSegment: "lower_intensity", prop: Routine.LOWER_INTENSITY },
    { routeSegment: "lower_volume", prop: Routine.LOWER_VOLUME },
  ].map((route) => ({
    path: `/routine/${route.routeSegment}`,
    element: guardRoutes(<Workout routine={route.prop} />, isAuthenticated),
  }));

  return createBrowserRouter([
    {
      path: "/",
      element: authRoute(<Login />, isAuthenticated),
    },
    {
      path: "/login",
      element: authRoute(<Login />, isAuthenticated),
    },
    {
      path: "/signup",
      element: authRoute(<SignUp />, isAuthenticated),
    },
    {
      path: "/home",
      element: guardRoutes(<Home />, isAuthenticated),
    },
    {
      path: "/verify",
      element: <Verify />,
    },
    {
      path: "/recovery",
      element: <ForgotPassword />,
    },
    {
      path: "/reset",
      // element: guardRoutes(<PasswordReset />, isAuthenticated),
      element: <PasswordReset />,
    },
    ...workoutRoutes,
  ]);
};
