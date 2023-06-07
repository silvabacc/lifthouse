import { SupabaseClient, createClient } from "@supabase/supabase-js";
import getConfig from "./config";

const { SUPABASE_URL, ANON_PUBLIC_KEY } = getConfig();

class Authentication {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, ANON_PUBLIC_KEY);
  }

  async login(email: string, password: string) {
    const loginResult = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    return loginResult.error
      ? { user: null, session: null, message: loginResult.error.message }
      : {
          user: loginResult.data.user,
          session: loginResult.data.session,
          message: "success",
        };
  }

  async signUp(email: string, password: string) {
    const signUpResult = await this.supabase.auth.signUp({ email, password });

    return signUpResult.error
      ? { user: null, session: null, message: signUpResult.error.message }
      : {
          user: signUpResult.data.user,
          session: signUpResult.data.session,
          message: "success",
        };
  }
}

export default Authentication;
