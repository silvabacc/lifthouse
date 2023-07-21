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
    dexie.writeTemporaryStorage(exerciseId, info, notes);
  };

  const removeSetFromExercise = (exerciseId: string, set: number) => {
    dexie.removeSetFromExercise(exerciseId, set);
  };

  const clearTemporaryStorage = () => {
    dexie.clearTemporaryStorage();
  };

  return {
    getTemporaryStorage,
    writeTemporaryStorage,
    removeSetFromExercise,
    clearTemporaryStorage,
  };
};
