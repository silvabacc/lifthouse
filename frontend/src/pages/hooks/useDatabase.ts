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

  const fetchTemporaryStorage = (exercise: Exercise) => {
    return useQuery("temporary", async () => {
      const result = await db.getTemporaryStorage(exercise);
      return result;
    });
  };

  const writeToTemporaryStorage = (
    exercise: Exercise,
    set: number,
    weight: number,
    reps: string
  ) => {
    db.writeTemporaryStorage(exercise, set, weight, reps);
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
