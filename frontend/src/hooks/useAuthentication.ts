import { useQuery } from "react-query";
import Authentication from "@backend/authentication";

const useAuthentication = () => {
  const auth = new Authentication();

  const login = async (email: string, password: string) => {
    const result = await auth.login(email, password);

    if (result.user === null) {
      return { success: false, message: result.message };
    }

    return { success: true, message: "success" };
  };

  const signUp = async (email: string, password: string) => {
    const result = await auth.signUp(email, password);

    if (result.user === null) {
      return { success: false, message: result.message };
    }

    return { success: true, message: "success" };
  };

  const signOut = async () => {
    await auth.signOut();
    return true;
  };

  const { data, isLoading, refetch } = useQuery("session", async () => {
    const auth = new Authentication();
    const session = await auth.getUser();
    return session;
  });

  return {
    login,
    signUp,
    signOut,
    auth: {
      user: data?.user || null,
      isAuthenticated: data?.isAuthenticated || false,
      authLoading: isLoading,
      fetchAuthUser: refetch,
    },
  };
};

export default useAuthentication;
