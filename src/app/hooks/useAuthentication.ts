import { useEffect } from "react";
import { useAppContext } from "../context";
import { createSupabaseClient } from "@/lib/supabase/client";

export const useAuthentication = () => {
  const { user, setUser } = useAppContext();

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

  return { user };
};
