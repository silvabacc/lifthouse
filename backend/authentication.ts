import { SupabaseClient, createClient } from "@supabase/supabase-js";
import getConfig from "./config";

const { SUPABASE_URL, ANON_PUBLIC_KEY } = getConfig();

class Authentication {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, ANON_PUBLIC_KEY, {
      auth: { autoRefreshToken: true },
    });
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

  async signOut() {
    this.supabase.auth.signOut();
  }

  async resetPasswordWithEmail(email: string) {
    const result = await this.supabase.auth.resetPasswordForEmail(email);

    if (result.error) {
      return { success: false, message: result.error.message };
    }

    return { success: true, message: "" };
  }

  async resetPassword(password: string) {
    const result = await this.supabase.auth.updateUser({ password: password });

    if (result.error) {
      return { success: false, message: result.error.message };
    }

    return { success: true, message: "" };
  }

  async getUser() {
    const result = await this.supabase.auth.getUser();

    const isAuthenticated = result.data.user !== null;
    return { isAuthenticated, user: result.data.user };
  }

  googleLogin() {
    this.supabase.auth.signInWithOAuth({ provider: "google" });
  }
}

export default Authentication;
