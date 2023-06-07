import "antd/dist/reset.css";
import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Workout from "./pages/Workout/Workout";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routine } from "../../backend/data";
import Authentication from "./pages/Authentication/Authentication";
import Verify from "./pages/Authentication/Verify/Verify";

//v6 react-router-dom removed regex support, so must statically route these
const workoutRoutes = [
  { routeSegment: "upper_intensity", prop: Routine.UPPER_INTENSITY },
  { routeSegment: "upper_volume", prop: Routine.UPPER_VOLUME },
  { routeSegment: "lower_intensity", prop: Routine.LOWER_INTENSITY },
  { routeSegment: "lower_volume", prop: Routine.LOWER_VOLUME },
].map((route) => ({
  path: `/routine/${route.routeSegment}`,
  element: <Workout routine={route.prop} />,
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  ...workoutRoutes,
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
