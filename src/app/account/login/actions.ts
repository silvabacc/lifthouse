"use server";

import { createSupabaseClient } from "@/lib/supabase/client";
import { headers } from "next/headers";

enum Provider {
  Google = "google",
}

export async function signInWithProvider(provider: Provider) {
  const { data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${domain}/auth/callback`,
    },
  });
}
