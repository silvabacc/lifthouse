"use server";

import { createSupabaseServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

enum Provider {
  Google = "google",
}

export async function signInWithEmail(email: string, password: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServer(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
