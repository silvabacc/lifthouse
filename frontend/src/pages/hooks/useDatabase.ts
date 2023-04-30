import { useQuery } from "react-query";
import { Exercise, Routine } from "../../../../backend/data";
import { db } from "../../../../backend/db";

export const useDatabase = () => {
  const fetchRoutinePlan = (routine: Routine) => {
    return useQuery("routines", async () => {
      const result = await db.getRoutine(routine);
      return result[0];
    });
  };

  const fetchTemporaryStorage = (routine: Routine) => {
    return useQuery("temporary", async () => {
      const result = await db.getTemporaryStorage(routine);
      return result;
    });
  };

  const writeToTemporaryStorage = (
    exercise: Exercise,
    routine: Routine,
    set: number,
    weight: number,
    reps: string
  ) => {
    db.writeTemporaryStorage(exercise, routine, set, weight, reps);
  };

  const clearTemporaryStorage = () => {
    db.clearTemporaryStorage();
  };

  return {
    fetchRoutinePlan,
    fetchTemporaryStorage,
    writeToTemporaryStorage,
    clearTemporaryStorage,
  };
};
