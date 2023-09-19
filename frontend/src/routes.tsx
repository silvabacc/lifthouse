import { RoutineType } from "@backend/types";
import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Workout from "./pages/Workout/Workout";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import DailyWeighIn from "./pages/DailyWeighIn/DailyWeighIn";
import MealTracker from "./pages/MealTracker/MealTracker";
import UpdatePassword from "./pages/Authentication/UpdatePassword";
import { useEffect } from "react";

//Redirects user to login if not authenticated
const guardRoutes = (
  element: JSX.Element,
  isAuthenticated: boolean,
  navigateTo?: string
) => {
  return (
    <>
      <ScrollToTop />
      {isAuthenticated ? element : <Navigate to={navigateTo || "/login"} />}
    </>
  );
};

//v6 react-router-dom removed regex support, so must statically route these
export const createRoutes = (isAuthenticated: boolean) => {
  const routes = [
    {
      path: "/",
      element: guardRoutes(<Home />, isAuthenticated),
    },
    {
      path: "/update-password",
      element: guardRoutes(<UpdatePassword />, isAuthenticated),
    },
    {
      path: "/home",
      element: guardRoutes(<Home />, isAuthenticated),
    },
    {
      path: "/weigh-in",
      element: guardRoutes(<DailyWeighIn />, isAuthenticated),
    },
    {
      path: "/meal-tracker",
      element: guardRoutes(<MealTracker />, isAuthenticated),
    },
    {
      path: "/recovery",
      element: <ForgotPassword />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  const workoutRoutes = [
    { routeSegment: "upper_intensity", prop: RoutineType.UPPER_INTENSITY },
    { routeSegment: "upper_volume", prop: RoutineType.UPPER_VOLUME },
    { routeSegment: "lower_intensity", prop: RoutineType.LOWER_INTENSITY },
    { routeSegment: "lower_volume", prop: RoutineType.LOWER_VOLUME },
  ].map((route) => ({
    path: `/routine/${route.routeSegment}`,
    element: guardRoutes(<Workout routine={route.prop} />, isAuthenticated),
  }));

  return createBrowserRouter([...routes, ...workoutRoutes]);
};

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
