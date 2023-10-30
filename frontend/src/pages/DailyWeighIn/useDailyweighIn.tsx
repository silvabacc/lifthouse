import LiftHouseDatabase from "@backend/database/db";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { Dayjs } from "dayjs";
import { useQuery } from "react-query";
import dayjs from "dayjs";

// Similar type exists in backend types but this uses Dayjs type for the UI
export interface DailyWeighInMonth {
  date: Dayjs;
  weight: number;
}

export const useDailyWeighIn = () => {
  const dbService = new LiftHouseDatabase();
  const {
    auth: { user },
  } = useAuthentication();

  const updateWeighIn = async (weight: number, date: Dayjs) => {
    await dbService.updateDailyWeighIn(user.id, weight, date.toDate());
  };

  const addWeighIn = async (weight: number, date: Dayjs) => {
    await dbService.insertDailyWeighIn(user.id, weight, date.toDate());
  };

  const getDailyWeighInsForMonth = (month: number, year: number) => {
    return useQuery(
      ["getDailyWeighInsForMonth", month, year, user.id],
      async () => {
        const data = await dbService.getDailyWeighInsForMonth(
          user.id,
          month,
          year
        );

        return data.map((weighIn) => ({
          ...weighIn,
          date: dayjs(weighIn.date),
        })) as DailyWeighInMonth[];
      },
      { refetchOnWindowFocus: false, keepPreviousData: true }
    );
  };

  return { updateWeighIn, addWeighIn, getDailyWeighInsForMonth };
};
