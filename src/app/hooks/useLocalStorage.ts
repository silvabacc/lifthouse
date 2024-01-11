"use client";

import { LogEntry, LogInfo } from "@/lib/supabase/db/types";

export function useLocalStorage() {
  const cacheLogInfo = (
    exerciseId: number,
    set: number,
    reps: number,
    weight: number
  ) => {
    const existing = window.localStorage.getItem(exerciseId.toString());

    if (existing) {
      const parsed = JSON.parse(existing) as LogInfo[];
      const parsedFilter = parsed.filter((p) => p.set !== set);
      const newEntry = { set, reps, weight };
      const updated = [...parsedFilter, newEntry];
      window.localStorage.setItem(
        exerciseId.toString(),
        JSON.stringify(updated)
      );
      return;
    }

    window.localStorage.setItem(
      exerciseId.toString(),
      JSON.stringify([{ set, reps, weight }])
    );
  };

  const getCachedLogInfo = (exerciseId: number): LogInfo[] => {
    const existing = window.localStorage.getItem(exerciseId.toString());

    if (!existing) {
      return [];
    }

    return JSON.parse(existing) as LogInfo[];
  };

  return { cacheLogInfo, getCachedLogInfo };
}
