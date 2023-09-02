import { useMutation, useQuery } from "react-query";
import LiftHouseDatabase from "@backend/database/db";
import { Exercise, Meal, RoutineExercise, RoutineType } from "@backend/types";
import useAuthentication from "./useAuthentication";
import { useTemporaryStorage } from "./useTemporaryStorage";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

export interface DailyWeighInMonth {
  date: Dayjs;
  weight: number;
}

export const useDatabase = () => {
  const dbService = new LiftHouseDatabase();
  const {
    auth: { user },
  } = useAuthentication();
  const { getTemporaryStorage } = useTemporaryStorage();

  /**
   *
   * @param routineId routine id to save to.
   * @param exercises list of exercies to save for the routine
   * @returns
   */
  const updateRoutine = async (
    routineId: string,
    exercises: RoutineExercise[]
  ) => {
    await dbService.updateRoutine(routineId, exercises);
  };

  const logEntry = async (exercises: Exercise[]) => {
    const temporaryStorage = exercises.map((exercise) => {
      return getTemporaryStorage(exercise.exerciseId);
    });

    const result = await Promise.all(temporaryStorage);

    dbService.logEntry(result, user.id);
  };

  const addWeighIn = async (weight: number, date: Dayjs) => {
    await dbService.insertDailyWeighIn(user.id, weight, date.toDate());
  };

  const updateWeighIn = async (weight: number, date: Dayjs) => {
    await dbService.updateDailyWeighIn(user.id, weight, date.toDate());
  };

  const addMeal = async (
    mealName: string,
    calories: number,
    protein: number
  ) => {
    await dbService.addMeal(mealName, calories, protein, user.id);
  };

  const deleteMeal = async (mealId: string) => {
    await dbService.deleteMeal(mealId);
  };

  const getMeals = (date: Date) => {
    return useQuery(["getMeals", date], async () => {
      return await dbService.getMeals(date, user.id);
    });
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
      }
    );
  };

  const getExerciseHistory = (exerciseId: string, limit?: number) => {
    return useQuery(["getExerciseHistory", exerciseId, user.id], async () => {
      return await dbService.getExerciseHistory(exerciseId, user.id, limit);
    });
  };

  const queryRoutine = (routineType: RoutineType) => {
    return useQuery(["queryRoutine", routineType, user.id], async () => {
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
    return useQuery(["queryExercises", exerciseIds], async () => {
      const exercises = await dbService.getExercises(exerciseIds);
      return exercises;
    });
  };

  const deleteLogEntry = (logEntryId: string) => {
    return dbService.deleteLogEntry(logEntryId);
  };

  return {
    addWeighIn,
    updateWeighIn,
    getDailyWeighInsForMonth,
    queryRoutine,
    queryExercises,
    updateRoutine,
    logEntry,
    getExerciseHistory,
    addMeal,
    deleteMeal,
    getMeals,
    deleteLogEntry,
  };
};
