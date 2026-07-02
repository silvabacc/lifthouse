"use server";

import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { createSupabaseServer } from "@/lib/supabase/server";
import { LogEntry } from "@/lib/supabase/db/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getLatestLogs(exerciseIds: number[]): Promise<LogEntry[]> {
  const db = await createDatabaseClient();
  return db.getLatestLogs(exerciseIds);
}

/**
 * Finds the most recent log for an exercise where the last set's weight
 * matches the expected weight for a specific 531 week. This ensures the
 * comparison shown in the modal ("last week you did X") is week-specific
 * rather than just the most recent log (which could be a different week).
 */
export async function getWeekSpecificLog(
  exerciseId: number,
  expectedLastSetWeight: number
): Promise<LogEntry | undefined> {
  const db = await createDatabaseClient();
  const logs = await db.getLogs([exerciseId], 20);
  // getLogs may return ascending — sort descending to find most recent match first
  const sorted = [...logs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sorted.find((log) => {
    const lastSet = log.info?.at(-1);
    // Allow ±1 kg tolerance to account for parseInt/toFixed rounding differences
    return lastSet != null && Math.abs(lastSet.weight - expectedLastSetWeight) <= 1;
  });
}

export async function saveLogs(logs: LogEntry[]): Promise<LogEntry[]> {
  const db = await createDatabaseClient();
  return db.setLogs(logs);
}

export async function signOut(): Promise<never> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServer(cookieStore);
  await supabase.auth.signOut();
  redirect("/");
}
