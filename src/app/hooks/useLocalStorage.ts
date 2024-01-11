"use client";

import { LogEntry, LogInfo } from "@/lib/supabase/db/types";

interface CacheLogInfo {
  info: LogInfo[];
  notes?: string;
}

export function useLocalStorage() {
  const cacheLogInfo = (
    exerciseId: number,
    { info, notes }: { info?: LogInfo; notes?: string }
  ) => {
    const existing = window.localStorage.getItem(exerciseId.toString());

    if (existing) {
      const parsed = JSON.parse(existing) as CacheLogInfo;
      const previousInfo = parsed.info.filter((p) => p.set !== info?.set);

      const newInfo = info && {
        set: info.set,
        reps: info.reps,
        weight: info.weight,
      };

      const updatedInfo = newInfo ? [...previousInfo, newInfo] : previousInfo;
      const newNotes = notes ? notes : parsed.notes;

      const updated = { info: updatedInfo, notes: newNotes };
      window.localStorage.setItem(
        exerciseId.toString(),
        JSON.stringify(updated)
      );
      return;
    }

    window.localStorage.setItem(
      exerciseId.toString(),
      JSON.stringify({
        info: [
          {
            set: info?.set,
            reps: info?.reps,
            weight: info?.weight,
          },
        ],
        notes,
      })
    );
  };

  const getCachedLogInfo = (exerciseId: number): CacheLogInfo | undefined => {
    const existing = window.localStorage.getItem(exerciseId.toString());

    if (!existing) {
      return;
    }

    return JSON.parse(existing) as CacheLogInfo;
  };

  return { cacheLogInfo, getCachedLogInfo };
}
