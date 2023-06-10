import React, { useCallback, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoutes } from "./routes";
import useAuthentication from "./hooks/useAuthentication";

const App: React.FC = () => {
  const { auth } = useAuthentication();

  const router = useCallback(() => {
    return createRoutes(auth.isAuthenticated);
  }, [auth.isAuthenticated]);

  return (
    <>
      {auth.authLoading ? <>Loading</> : <RouterProvider router={router()} />}
    </>
  );
};

export default App;
