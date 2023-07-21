import { useQuery } from "react-query";
import Authentication from "@backend/authentication";
import { User } from "@supabase/supabase-js";

const useAuthentication = () => {
  const auth = new Authentication();

  const login = async (email: string, password: string) => {
    const result = await auth.login(email, password);

    if (result.user === null) {
      return { success: false, message: result.message };
    }

    refetch();

    return { success: true, message: "success" };
  };

  const loginWithGoogle = () => {
    auth.googleLogin();
  };

  const signUp = async (email: string, password: string) => {
    const result = await auth.signUp(email, password);

    if (result.user === null) {
      return { success: false, message: result.message };
    }

    return { success: true, message: "success" };
  };

  const signOut = async () => {
    const result = await auth.signOut();
    refetch();
    return result;
  };

  const resetPasswordWithEmail = async (email: string) => {
    const result = await auth.resetPasswordWithEmail(email);
    return result;
  };

  const resetPassword = async (password: string) => {
    const result = await auth.resetPassword(password);
    return result;
  };

  const { data, isLoading, refetch } = useQuery(
    "session",
    async () => {
      const auth = new Authentication();
      const session = await auth.getUser();

      return session;
    },
    { enabled: false }
  );

  return {
    login,
    loginWithGoogle,
    signUp,
    signOut,
    resetPasswordWithEmail,
    resetPassword,
    auth: {
      user: data?.user || ({} as User),
      isAuthenticated: data?.isAuthenticated || false,
      authLoading: isLoading,
      fetchAuthUser: refetch,
    },
  };
};

export default useAuthentication;