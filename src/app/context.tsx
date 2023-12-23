"use client";

import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

type AppContext = {
  user: User | undefined;
  setUser: (user: User) => void;
  sideNavCollapsed: boolean;
  setSideNavCollapsed: (value: boolean) => void;
};

const AppContext = createContext<AppContext>({} as AppContext);

const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [sideNavCollapsed, setSideNavCollapsed] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{ user, setUser, sideNavCollapsed, setSideNavCollapsed }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { useAppContext, AppContextProvider };
