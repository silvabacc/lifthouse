"use client";

import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

type AppContext = {
  user: User | undefined;
  setUser: (user: User) => void;
};

const AppContext = createContext<AppContext>({} as AppContext);

const useAppcontext = () => useContext(AppContext);

const AppContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { useAppcontext, AppContextProvider };
