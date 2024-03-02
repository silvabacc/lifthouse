"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Spin } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import LifthouseLogo from "@/app/assets/lifthouse_logo_black.png";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons";
import { FadeInAnimation } from "./aniamtions/fadeinAnimation";

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
    return (
      <FadeInAnimation className="flex flex-col justify-center items-center w-full h-full">
        <Image className="mb-2 w-full h-20" src={LifthouseLogo} alt="" />
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 24, color: "black" }} spin />
          }
        />
      </FadeInAnimation>
    );
  }

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { useAppContext, AppContextProvider };
