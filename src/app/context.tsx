"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Spin } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import LifthouseLogo from "@/app/assets/lifthouse_logo_black.png";
import Image from "next/image";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

type AppContext = {
  user: User | undefined;
  setUser: (user: User) => void;
};

const AppContext = createContext<AppContext>({} as AppContext);

const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const supabase = createSupabaseClient();
      const userResponse = await supabase.auth.getUser();
      setLoading(false);

      if (userResponse.data.user) {
        setUser(userResponse.data.user);
      }

      if (userResponse.error) {
        router.push("/");
      }
    };

    if (!user) {
      fetchUser();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Image className="mb-2 w-72 h-20" src={LifthouseLogo} alt="" />
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 24, color: "black" }} spin />
          }
        />
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { useAppContext, AppContextProvider };
