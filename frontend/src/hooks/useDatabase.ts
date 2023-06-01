import { useQuery } from "react-query";
import LifthosueDB from "@backend/db";

export const useDatabase = () => {
  const fetchRoutine = () => {
    return useQuery("fetchRoutine", () => {});
  };
};
