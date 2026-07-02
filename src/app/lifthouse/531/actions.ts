"use server";

import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { FiveThreeOne } from "@/lib/supabase/db/types";

export async function updateFiveThreeOnePersonalBests(info: {
  bench: number;
  squat: number;
  deadlift: number;
  ohp: number;
}): Promise<FiveThreeOne> {
  const db = await createDatabaseClient();
  return db.setFiveThreeOne(info);
}
