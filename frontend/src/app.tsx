import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoutes } from "./routes";
import useAuthentication from "./hooks/useAuthentication";
import Loading from "./pages/common/Loading";

const App: React.FC = () => {
  const { auth } = useAuthentication();

  useEffect(() => {
    auth.fetchAuthUser();
  }, []);

  if (!auth.authFetched) {
    return <Loading />;
  }

  return <RouterProvider router={createRoutes(auth.isAuthenticated)} />;
};

export default App;
