import { LocalStorageDb } from "@backend/dexie";
import { Info } from "@backend/types";
import { useQuery } from "react-query";

interface TemporaryStorage {
  set?: number;
  reps?: number;
  weight?: number;
  notes?: string;
}

export const useTemporaryStorage = () => {
  const dexie = new LocalStorageDb();

  const getTemporaryStorage = (exerciseId: string) => {
    return dexie.getTemporaryStorage(exerciseId);
  };

  const writeTemporaryStorage = (
    exerciseId: string,
    info?: Info,
    notes?: string
  ) => {
    if (info?.reps === 0 || info?.weight === 0) {
      dexie.clearTemporaryStorageForExercise(exerciseId);
      return;
    }

    dexie.writeTemporaryStorage(exerciseId, info, notes);
  };

  const removeSetFromExercise = (exerciseId: string, set: number) => {
    dexie.removeSetFromExercise(exerciseId, set);
  };

  const clearTemporaryStorage = () => {
    dexie.clearTemporaryStorage();
  };

  const clearTemporaryStorageForExercise = (exerciseId: string) => {
    dexie.clearTemporaryStorageForExercise(exerciseId);
  };

  return {
    getTemporaryStorage,
    writeTemporaryStorage,
    removeSetFromExercise,
    clearTemporaryStorageForExercise,
    clearTemporaryStorage,
  };
};
