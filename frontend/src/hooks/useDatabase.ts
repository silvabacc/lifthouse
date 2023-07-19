import { useQuery } from "react-query";
import LiftHouseDatabase from "@backend/database/db";
import { RoutineExercise, RoutineType } from "@backend/types";
import useAuthentication from "./useAuthentication";

export const useDatabase = () => {
  const dbService = new LiftHouseDatabase();
  const {
    auth: { user },
  } = useAuthentication();

  /**
   *
   * @param routineId routine id to save to.
   * @param exercises list of exercies to save for the routine
   * @returns
   */
  const updateRoutine = (routineId: string, exercises: RoutineExercise[]) => {
    dbService.updateRoutine(routineId, exercises);
  };

  const queryRoutine = (routineType: RoutineType) => {
    return useQuery(["fetchRoutine", routineType, user.id], async () => {
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
    return useQuery(["fetchExercises", exerciseIds], async () => {
      const exercises = await dbService.getExercises(exerciseIds);
      return exercises;
    });
  };

  return { queryRoutine, queryExercises, updateRoutine };
};
