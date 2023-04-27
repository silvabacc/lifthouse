import { useQueries, useQuery } from "react-query";
import { Routine } from "../../../../backend/data";
import { db } from "../../../../backend/db";

export const useDatabase = () => {
  const fetchRoutinePlan = (routine: Routine) => {
    return useQuery("routines", () => {
      const result = db.getRoutine(routine);
      return result;
    });
  };

  return { fetchRoutinePlan };
};
