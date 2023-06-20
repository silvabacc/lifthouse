import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

interface AppContext {
  setUser: (user: User | null) => void;
}

/**
 * Not being used yet
 */

const AppContext = createContext<AppContext>({} as AppContext);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
