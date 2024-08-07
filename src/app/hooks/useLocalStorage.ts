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

const STORAGE_KEYS = {
  VIEW: "view",
  FIVE_THREE_ONE: "531",
  TUTORIAL: "tutorial",
};

enum TutorialStorage {
  workoutPage = "workoutPage",
}

export function useLocalStorage() {
  const getTutorialFlag = (value: TutorialStorage) => {
    const storage = window.localStorage.getItem(STORAGE_KEYS.TUTORIAL);

    if (!storage) {
      return value;
    }

    return (JSON.parse(storage) as TutorialStorage)[value] || false;
  };

  const setTutorialFlag = (flag: boolean) => {
    if (flag) {
      window.localStorage.setItem(STORAGE_KEYS.TUTORIAL, "enabled");
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.TUTORIAL);
    }
  };

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
    window.localStorage.setItem(STORAGE_KEYS.VIEW, view);
  };

  const getCachedView = () => {
    return window.localStorage.getItem(STORAGE_KEYS.VIEW) as View | undefined;
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
    window.localStorage.setItem(
      STORAGE_KEYS.FIVE_THREE_ONE,
      JSON.stringify({ week, completed })
    );
  };

  const getCachedFiveThreeOneInfo = (): CachedFiveThreeOneInfo | undefined => {
    const existing = window.localStorage.getItem(STORAGE_KEYS.FIVE_THREE_ONE);
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
    getTutorialFlag,
    setTutorialFlag,
    collapsedStorage,
  };
}
