"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type AppContext = {
  user: User | undefined;
  setUser: (user: User) => void;
};

const AppContext = createContext<AppContext>({} as AppContext);

const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createSupabaseClient();
      const userResponse = await supabase.auth.getUser();

      if (userResponse.data.user) {
        setUser(userResponse.data.user);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [setUser, user]);

  if (!user) {
    return <>Loading</>;
  }

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { useAppContext, AppContextProvider };
