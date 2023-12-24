"use client";

import { PageStartAnimation } from "@/app/aniamtions/pageStartAnimation";
import { createSupabaseClient } from "@/lib/supabase/client";

export default function Workouts() {
  const supabase = createSupabaseClient();
  return (
    <PageStartAnimation>
      <h1>Welcome to Lifthouse</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    </PageStartAnimation>
  );
}
