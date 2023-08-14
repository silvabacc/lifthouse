import { RoutineType } from "@backend/types";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Verify from "./pages/Authentication/Verify";
import Home from "./pages/Home/Home";
import Workout from "./pages/Workout/Workout";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import PasswordReset from "./pages/Authentication/PasswordReset";
import DailyWeighIn from "./pages/DailyWeighIn/DailyWeighIn";
import MealTracker from "./pages/MealTracker/MealTracker";
import ChangePassword from "./pages/Authentication/ChangePassword";

//Redirects user to login if not authenticated
const guardRoutes = (
  element: JSX.Element,
  isAuthenticated: boolean,
  navigateTo?: string
) => {
  return isAuthenticated ? element : <Navigate to={navigateTo || "/"} />;
};

//Redirects user to home if authenticated
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
    { routeSegment: "upper_intensity", prop: RoutineType.UPPER_INTENSITY },
    { routeSegment: "upper_volume", prop: RoutineType.UPPER_VOLUME },
    { routeSegment: "lower_intensity", prop: RoutineType.LOWER_INTENSITY },
    { routeSegment: "lower_volume", prop: RoutineType.LOWER_VOLUME },
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
      path: "/change-password",
      element: guardRoutes(<ChangePassword />, isAuthenticated),
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
      element: guardRoutes(<PasswordReset />, isAuthenticated),
    },
    {
      path: "/weigh-in",
      element: guardRoutes(<DailyWeighIn />, isAuthenticated),
    },
    {
      path: "/meal-tracker",
      element: guardRoutes(<MealTracker />, isAuthenticated),
    },
    ...workoutRoutes,
  ]);
};
