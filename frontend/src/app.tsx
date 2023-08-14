import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoutes } from "./routes";
import useAuthentication from "./hooks/useAuthentication";
import Loading from "./pages/common/Loading";

const App: React.FC = () => {
  const { auth } = useAuthentication();
  // Need a loading state here because initally, when data is not being fetched
  // The loading state from useQuery is false, but we need loading to be true
  // In order to avoid routes being created with the wrong authentication
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    auth.fetchAuthUser();
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated && !auth.authLoading) {
      setLoading(false);
    }
  }, [auth.authLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return <RouterProvider router={createRoutes(auth.isAuthenticated)} />;
};

export default App;
