import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoutes } from "./routes";
import useAuthentication from "./hooks/useAuthentication";

const App: React.FC = () => {
  const { auth } = useAuthentication();

  useEffect(() => {
    auth.fetchAuthUser();
  }, []);

  if (auth.authLoading) {
    return <>Loading</>;
  }

  return <RouterProvider router={createRoutes(auth.isAuthenticated)} />;
};

export default App;
