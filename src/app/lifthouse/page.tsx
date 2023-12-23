"use client";

import { createSupabaseClient } from "@/lib/supabase/client";

export default function Lifthouse() {
  const supabase = createSupabaseClient();

  return (
    <>
      <h1>Welcome to Lifthouse</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    </>
  );
}
