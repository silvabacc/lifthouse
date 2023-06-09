import "antd/dist/reset.css";
import "./index.css";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Workout from "./pages/Workout/Workout";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routine } from "../../backend/data";
import Authentication from "./pages/Authentication/Authentication";
import Verify from "./pages/Authentication/Verify/Verify";
import { AppContextProvider } from "./context/AppContext";
import AuthenticationService from "@backend/authentication";

const guardRoutes = async (element: JSX.Element) => {
  const service = new AuthenticationService();
  const result = await service.getUser();

  if (result.data === null || result.error) {
    return <Navigate to={"/"} />;
  }
  return element;
};

//v6 react-router-dom removed regex support, so must statically route these
const workoutRoutes = [
  { routeSegment: "upper_intensity", prop: Routine.UPPER_INTENSITY },
  { routeSegment: "upper_volume", prop: Routine.UPPER_VOLUME },
  { routeSegment: "lower_intensity", prop: Routine.LOWER_INTENSITY },
  { routeSegment: "lower_volume", prop: Routine.LOWER_VOLUME },
].map(async (route) => ({
  path: `/routine/${route.routeSegment}`,
  element: await guardRoutes(<Workout routine={route.prop} />),
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: await guardRoutes(<Authentication />),
  },
  {
    path: "/home",
    element: await guardRoutes(<Home />),
  },
  {
    path: "/verify",
    element: await guardRoutes(<Verify />),
  },
  ...(await Promise.all(workoutRoutes)),
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </QueryClientProvider>
);
