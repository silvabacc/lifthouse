import { LocalStorageDb } from "@backend/dexie";
import { useQuery } from "react-query";

export const useTemporaryStorage = () => {
  const dexie = new LocalStorageDb();

  const getTemporaryStorage = (exerciseId: string) => {
    return useQuery("temporaryStorage", async () => {
      return await dexie.getTemporaryStorage(exerciseId);
    });
  };

  const writeTemporaryStorage = (
    exerciseId: string,
    set: number,
    reps: number,
    weight: number
  ) => {
    dexie.writeTemporaryStorage(exerciseId, set, reps, weight);
  };

  return { getTemporaryStorage, writeTemporaryStorage };
};
