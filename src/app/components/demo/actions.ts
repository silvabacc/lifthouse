"use server";

import { createSupabaseServer } from "@/lib/supabase/server";
import { cookies, headers } from "next/headers";

export async function createDemoAccount() {
  const cookieStore = cookies();
  const origin = headers().get("origin");
  const supabaseServer = createSupabaseServer(cookieStore);

  const email = `demo-${crypto.randomUUID()}@lifthouse.com`;
  const password = crypto.randomUUID();

  const { data, error } = await supabaseServer.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (data.user) {
    await supabaseServer
      .from("demo_accounts")
      .upsert({ user_id: data.user.id });
  }

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
