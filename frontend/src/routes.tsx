import { RoutineType } from "@backend/types";
import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import WorkoutTwo from "./pages/WorkoutTwo/Workout";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import MealTracker from "./pages/MealTracker/MealTracker";
import UpdatePassword from "./pages/Authentication/UpdatePassword";
import { useEffect } from "react";
import DailyWeightIn from "./pages/DailyWeighIn/DailyWeightIn";
import Header from "./pages/common/Header";
import SettingMenu from "./common/SettingMenu";

export const pageTitleMapping = {
  [RoutineType.UPPER_INTENSITY]: "Upper Intensity",
  [RoutineType.UPPER_VOLUME]: "Upper Volume",
  [RoutineType.LOWER_INTENSITY]: "Lower Intensity",
  [RoutineType.LOWER_VOLUME]: "Lower Volume",
};

//Redirects user to login if not authenticated
const guardRoutes = (
  element: JSX.Element,
  isAuthenticated: boolean,
  title?: string,
  showBackButton = true
) => {
  return (
    <>
      <ScrollToTop />
      <Header
        title={title || ""}
        showBackButton={showBackButton}
        rightHandSide={<SettingMenu />}
      />
      {isAuthenticated ? element : <Navigate to={"/login"} />}
    </>
  );
};

//v6 react-router-dom removed regex support, so must statically route these
export const createRoutes = (isAuthenticated: boolean) => {
  const routes = [
    {
      path: "/",
      element: guardRoutes(
        <Home />,
        isAuthenticated,
        "Time to Grind 💪",
        false
      ),
    },
    {
      path: "/home",
      element: guardRoutes(
        <Home />,
        isAuthenticated,
        "Time to Grind 💪",
        false
      ),
    },
    {
      path: "/update-password",
      element: guardRoutes(
        <UpdatePassword />,
        isAuthenticated,
        "Update Password 🔒"
      ),
    },
    {
      path: "/weigh-in",
      element: guardRoutes(
        <DailyWeightIn />,
        isAuthenticated,
        "Daily Weigh In ⚖️"
      ),
    },
    {
      path: "/meal-tracker",
      element: guardRoutes(<MealTracker />, isAuthenticated, "Meal Tracker 🥑"),
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
    element: guardRoutes(
      <WorkoutTwo routineType={route.prop} />,
      isAuthenticated,
      pageTitleMapping[route.prop]
    ),
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
