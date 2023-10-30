import { LocalStorageDb } from "@backend/dexie";
import { Info } from "@backend/types";

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
    if (info?.reps === 0 && info?.weight === 0) {
      removeSetFromExercise(exerciseId, info.set);
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
