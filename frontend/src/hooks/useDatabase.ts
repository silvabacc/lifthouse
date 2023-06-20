import { useQuery } from "react-query";
import LiftHouseDatabase from "@backend/database/db";
import { RoutineType } from "@backend/types";
import useAuthentication from "./useAuthentication";

export const useDatabase = () => {
  const dbService = new LiftHouseDatabase();

  const queryRoutine = (routineType: RoutineType, userId: string) => {
    return useQuery(["fetchRoutine", routineType, userId], async () => {
      const routine = await dbService.getRoutines(routineType, userId);
      return routine;
    });
  };

  return { queryRoutine };
};
