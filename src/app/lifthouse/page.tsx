"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { Layout } from "antd";
import { PageStartAnimation } from "../aniamtions/pageStartAnimation";

export default function Lifthouse() {
  const supabase = createSupabaseClient();

  return (
    <PageStartAnimation>
      <h1>Welcome to Lifthouse</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    </PageStartAnimation>
  );
}
