import { useQuery } from "react-query";
import LiftHouseDatabase from "@backend/database/db";
import { RoutineType } from "@backend/types";
import useAuthentication from "./useAuthentication";

export const useDatabase = () => {
  const dbService = new LiftHouseDatabase();
  const {
    auth: { user },
  } = useAuthentication();

  const queryRoutine = (routineType: RoutineType) => {
    return useQuery(["fetchRoutine", routineType, user.id], async () => {
      const routine = await dbService.getRoutines(routineType, user.id);
      return routine;
    });
  };

  const queryExercises = (exerciseIds: string[]) => {
    return useQuery(["fetchExercises", exerciseIds], async () => {
      const exercises = await dbService.getExercises(exerciseIds);
      return exercises;
    });
  };

  return { queryRoutine, queryExercises };
};
