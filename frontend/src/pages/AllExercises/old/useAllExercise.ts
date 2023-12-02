import LiftHouseDatabase from "@backend/database/db";
import Bucket from "@backend/bucket";
import { useQuery } from "react-query";

export const useAllExercises = () => {
  const dbService = new LiftHouseDatabase();
  const bucket = new Bucket();

  const fetchAllExercises = (page: number) => {
    const LIMIT = 10;
    return useQuery(
      ["allExercise", page],
      async () => {
        const data = await dbService.getAllExercises(page, LIMIT);
        return data;
      },
      { refetchOnWindowFocus: false, keepPreviousData: true }
    );
  };

  const getExerciseImageUrl = (exerciseId: string) => {
    return bucket.getExerciseImageUrl(exerciseId);
  };

  return { fetchAllExercises, getExerciseImageUrl };
};
