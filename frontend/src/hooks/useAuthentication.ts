import { useQuery } from "react-query";
import Authentication from "@backend/authentication";

const useAuthentication = () => {
  const login = (email: string, password: string) => {
    const auth = new Authentication();
    const result = auth.login(email, password);
    return result;
  };

  const signUp = (email: string, password: string) => {
    const auth = new Authentication();
    const result = auth.signUp(email, password);
    return result;
  };

  return { login, signUp };
};

export default useAuthentication;
