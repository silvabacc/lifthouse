"use client";

import { LogInfo } from "@/lib/supabase/db/types";
import { View } from "../lifthouse/components/logVisuals/types";

interface CacheLogInfo {
  info: LogInfo[];
  notes?: string;
}

interface CachedFiveThreeOneInfo {
  week: number;
  completed: number[];
}

export function useLocalStorage() {
  const collapsedStorage = {
    get: () => {
      return window.localStorage.getItem("collapsed") === "true";
    },
    set: (collapsed: boolean) => {
      window.localStorage.setItem("collapsed", collapsed.toString());
    },
  };

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
      const newNotes = !newInfo ? notes : parsed.notes;

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

  const removeLogInfo = (exerciseId: number, set: number) => {
    const existing = window.localStorage.getItem(exerciseId.toString());

    if (!existing) {
      return;
    }

    const parsed = JSON.parse(existing) as CacheLogInfo;
    const updatedInfo = parsed.info.filter((p) => p.set !== set);

    window.localStorage.setItem(
      exerciseId.toString(),
      JSON.stringify({ info: updatedInfo, notes: parsed.notes })
    );
  };

  const getCachedLogInfo = (exerciseId: number): CacheLogInfo | undefined => {
    const existing = window.localStorage.getItem(exerciseId.toString());

    if (!existing) {
      return;
    }

    return JSON.parse(existing) as CacheLogInfo;
  };

  const clearCacheLogInfo = (exerciseId: number[]) => {
    exerciseId.forEach((id) => window.localStorage.removeItem(id.toString()));
  };

  const cacheView = (view: View) => {
    window.localStorage.setItem("view", view);
  };

  const getCachedView = () => {
    return window.localStorage.getItem("view") as View | undefined;
  };

  const clearAllLocalStorage = () => {
    window.localStorage.clear();
  };

  const cacheFiveThreeOneInfo = ({
    week,
    completed,
  }: {
    week: number;
    completed: number[];
  }) => {
    window.localStorage.setItem("531", JSON.stringify({ week, completed }));
  };

  const getCachedFiveThreeOneInfo = (): CachedFiveThreeOneInfo | undefined => {
    const existing = window.localStorage.getItem("531");
    if (!existing) {
      return;
    }

    return JSON.parse(existing) as CachedFiveThreeOneInfo;
  };

  const clearFiveThreeOne = () => {
    window.localStorage.removeItem("531");
  };

  return {
    cacheLogInfo,
    removeLogInfo,
    getCachedLogInfo,
    clearCacheLogInfo,
    getCachedView,
    cacheView,
    clearAllLocalStorage,
    getCachedFiveThreeOneInfo,
    cacheFiveThreeOneInfo,
    clearFiveThreeOne,
    collapsedStorage,
  };
}
