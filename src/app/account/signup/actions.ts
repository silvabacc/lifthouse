"use server";

import { cookies, headers } from "next/headers";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function signUp(email: string, password: string) {
  const cookieStore = cookies();
  const origin = headers().get("origin");
  const supabase = createSupabaseServer(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
