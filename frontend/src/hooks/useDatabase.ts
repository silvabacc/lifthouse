import { useQuery } from "react-query";

export const useDatabase = () => {
  const fetchRoutine = () => {
    return useQuery("fetchRoutine", () => {});
  };
};
