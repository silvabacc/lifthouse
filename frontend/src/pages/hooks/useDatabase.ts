import { useQuery } from "react-query";
import { Exercise, ExerciseType, Routine } from "../../../../backend/data";
import { LogEntry, Routines, db } from "../../../../backend/db";

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

  const fetchExercises = () => {
    return useQuery("exercises", async () => {
      const result = await db.getExercises();
      return result;
    });
  };

  const updateRoutine = (exercises: Exercise[], routine: Routines) => {
    db.writeExerciseToRoutine(exercises, routine);
  };

  const logEntries = (logEntries: LogEntry[]) => {
    logEntries.forEach((entry) => db.writeLogEntry(entry));
  };

  const updateTemporaryStorage = (
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
    fetchExercises,
    updateRoutine,
    logEntries,
    updateTemporaryStorage,
    clearTemporaryStorage,
  };
};
