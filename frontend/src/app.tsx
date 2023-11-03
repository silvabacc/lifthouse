import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { createRoutes } from "./routes";
import useAuthentication from "./hooks/useAuthentication";
import Loading from "./pages/common/Loading";
import { AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  const { auth } = useAuthentication();
  const location = useLocation();

  useEffect(() => {
    auth.fetchAuthUser();
  }, []);

  if (!auth.authFetched) {
    return <Loading />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        {createRoutes(auth.isAuthenticated).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default App;
