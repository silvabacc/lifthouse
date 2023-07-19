import { LocalStorageDb } from "@backend/dexie";
import { useQuery } from "react-query";

export const useTemporaryStorage = () => {
  const dexie = new LocalStorageDb();

  const getTemporaryStorage = (exerciseId: string) => {
    return dexie.getTemporaryStorage(exerciseId);
  };

  const writeTemporaryStorage = (
    exerciseId: string,
    set: number,
    reps: number,
    weight: number
  ) => {
    dexie.writeTemporaryStorage(exerciseId, set, reps, weight);
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
