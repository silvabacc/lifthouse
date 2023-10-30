import LiftHouseDatabase from "@backend/database/db";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useQuery } from "react-query";

export const useMealTracker = () => {
  const dbService = new LiftHouseDatabase();
  const {
    auth: { user },
  } = useAuthentication();

  const deleteMeal = async (mealId: string) => {
    await dbService.deleteMeal(mealId);
  };

  const getMeals = (date: Date) => {
    return useQuery(
      ["getMeals", date],
      async () => {
        return await dbService.getMeals(date, user.id);
      },
      { refetchOnWindowFocus: false, keepPreviousData: true }
    );
  };

  const addMeal = async (
    mealName: string,
    calories: number,
    protein: number
  ) => {
    await dbService.addMeal(mealName, calories, protein, user.id);
  };

  return { deleteMeal, getMeals, addMeal };
};
