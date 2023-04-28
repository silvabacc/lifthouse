import { useQuery } from "react-query";
import { Routine } from "../../../../backend/data";
import { db } from "../../../../backend/db";

export const useDatabase = () => {
  const fetchRoutinePlan = (routine: Routine) => {
    return useQuery("routines", async () => {
      const result = await db.getRoutine(routine);
      return result[0];
    });
  };

  return { fetchRoutinePlan };
};
