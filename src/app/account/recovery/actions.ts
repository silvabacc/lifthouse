"use server";

import { createSupabaseServer } from "@/lib/supabase/server";
import { cookies, headers } from "next/headers";

export async function recoverPassword(email: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServer(cookieStore);
  const origin = headers().get("origin");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
