"use client";

import { createSupabaseClient } from "@/lib/supabase/client";

export default function Workouts() {
  const supabase = createSupabaseClient();
  return (
    <div>
      <h1>Welcome to Lifthouse</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    </div>
  );
}
