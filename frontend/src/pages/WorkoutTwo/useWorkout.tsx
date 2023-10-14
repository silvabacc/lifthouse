import LiftHouseDatabase from "@backend/database/db";
import {
  Exercise,
  LogEntry,
  RoutineExercise,
  RoutineType,
} from "@backend/types";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { useQuery } from "react-query";

export const useWorkout = () => {
  const dbService = new LiftHouseDatabase();
  const {
    auth: { user },
  } = useAuthentication();
  const { getTemporaryStorage } = useTemporaryStorage();

  /**
   *
   * @param routineId routine id to save to.
   * @param exercises list of exercies to save for the routine
   * @returns
   */
  const updateRoutine = async (
    routineId: string,
    exercises: RoutineExercise[]
  ) => {
    await dbService.updateRoutine(routineId, exercises);
  };

  const queryRoutine = (routineType: RoutineType) => {
    return useQuery(["queryRoutine", routineType, user.id], async () => {
      const routine = await dbService.getRoutines(routineType, user.id);
      const exerciseIds = routine.exercises.map(
        (exercise) => exercise.exerciseId
      );
      const exercises = await dbService.getExercises(exerciseIds);
      return { routine, exercises };
    });
  };

  /**
   *
   * @param exerciseIds returns exercises with the given ids. If empty, returns all exercises
   * @returns Exercises
   */
  const queryExercises = (exerciseIds?: string[]) => {
    return useQuery(["queryExercises", exerciseIds], async () => {
      const exercises = await dbService.getExercises(exerciseIds);
      return exercises;
    });
  };

  const logEntry = async (exercises: Exercise[]) => {
    const temporaryStorage = exercises.map((exercise) => {
      return getTemporaryStorage(exercise.exerciseId);
    });

    const result = await Promise.all(temporaryStorage);

    return await dbService.logEntry(result, user.id);
  };

  const getExerciseHistory = (
    exerciseId: string,
    offset: number,
    limit: number
  ) => {
    return useQuery(
      ["getExerciseHistory", exerciseId, user.id, offset, limit],
      async () => {
        return await dbService.getExerciseHistory(
          exerciseId,
          user.id,
          offset,
          limit
        );
      }
    );
  };

  const updateLogEntries = async (logEntries: LogEntry[]) => {
    logEntries.forEach((logEntry) => dbService.updateExerciseHistory(logEntry));
  };

  const deleteLogEntry = (logEntryId: string) => {
    return dbService.deleteLogEntry(logEntryId);
  };

  return {
    updateRoutine,
    queryRoutine,
    queryExercises,
    logEntry,
    getExerciseHistory,
    updateLogEntries,
    deleteLogEntry,
  };
};
