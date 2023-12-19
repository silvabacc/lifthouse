"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Lifthouse() {
  const supabase = createClientComponentClient();

  return (
    <>
      <h1>Welcome to Lifthouse</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    </>
  );
}
