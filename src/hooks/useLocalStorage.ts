"use client";

import { LogInfo } from "@/lib/supabase/db/types";
import { View } from "@/app/lifthouse/components/logVisuals/types";

interface CacheLogInfo {
  info: LogInfo[];
  notes?: string;
}

interface CachedFiveThreeOneInfo {
  week: number;
  completed: number[];
}

/**
 * All functions are module-level and referentially stable, so they're safe to
 * use in effect/callback dependency arrays without triggering re-runs. The
 * useLocalStorage() hook simply returns this stable object, keeping the
 * existing call-site API unchanged.
 */

const collapsedStorage = {
  get: () => window.localStorage.getItem("collapsed") === "true",
  set: (collapsed: boolean) => {
    window.localStorage.setItem("collapsed", collapsed.toString());
  },
};

function cacheLogInfo(
  exerciseId: number,
  { info, notes }: { info?: LogInfo; notes?: string }
) {
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
    window.localStorage.setItem(exerciseId.toString(), JSON.stringify(updated));
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
}

function removeLogInfo(exerciseId: number, set: number) {
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
}

function getCachedLogInfo(exerciseId: number): CacheLogInfo | undefined {
  const existing = window.localStorage.getItem(exerciseId.toString());

  if (!existing) {
    return;
  }

  return JSON.parse(existing) as CacheLogInfo;
}

function clearCacheLogInfo(exerciseIds: number[]) {
  exerciseIds.forEach((id) => window.localStorage.removeItem(id.toString()));
}

function cacheView(view: View) {
  window.localStorage.setItem("view", view);
}

function getCachedView() {
  return window.localStorage.getItem("view") as View | undefined;
}

function clearAllLocalStorage() {
  window.localStorage.clear();
}

function cacheFiveThreeOneInfo({
  week,
  completed,
}: {
  week: number;
  completed: number[];
}) {
  window.localStorage.setItem("531", JSON.stringify({ week, completed }));
}

function getCachedFiveThreeOneInfo(): CachedFiveThreeOneInfo | undefined {
  const existing = window.localStorage.getItem("531");
  if (!existing) {
    return;
  }

  return JSON.parse(existing) as CachedFiveThreeOneInfo;
}

function clearFiveThreeOne() {
  window.localStorage.removeItem("531");
}

const storage = {
  collapsedStorage,
  cacheLogInfo,
  removeLogInfo,
  getCachedLogInfo,
  clearCacheLogInfo,
  getCachedView,
  cacheView,
  clearAllLocalStorage,
  cacheFiveThreeOneInfo,
  getCachedFiveThreeOneInfo,
  clearFiveThreeOne,
} as const;

export function useLocalStorage() {
  return storage;
}
