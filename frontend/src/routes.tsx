import { Routine } from "@backend/data";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Authentication from "./pages/Authentication/Authentication";
import Verify from "./pages/Authentication/Verify/Verify";
import Home from "./pages/Home/Home";
import Workout from "./pages/Workout/Workout";

const guardRoutes = (element: JSX.Element, isAuthenticated: boolean) => {
  return isAuthenticated ? element : <Navigate to={"/"} />;
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
      element: <Authentication />,
    },
    {
      path: "/home",
      element: guardRoutes(<Home />, isAuthenticated),
    },
    {
      path: "/verify",
      element: guardRoutes(<Verify />, isAuthenticated),
    },
    ...workoutRoutes,
  ]);
};
