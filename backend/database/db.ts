import { SupabaseClient, User, createClient } from "@supabase/supabase-js";
import getConfig from "../../config";
import { routineSetup } from "../data";
import {
  DailyWeighInColumns,
  ExerciseColumns,
  LogEntriesColumns,
  MealsColumns,
  RoutineORM,
  RoutinesColumns,
  TableNames,
} from "./types";
import {
  Exercise,
  Routine,
  RoutineExercise,
  RoutineType,
  LogEntry,
  DailyWeighIn,
  Meal,
} from "@backend/types";

const { SUPABASE_URL, ANON_PUBLIC_KEY } = getConfig();

class LiftHouseDatabase {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, ANON_PUBLIC_KEY);
  }

  private async createDefaultRoutine(routine: RoutineType, userId: string) {
    const fetchDefaultExercises = routineSetup[routine].map(
      async (exercise) => {
        const { data } = await this.supabase
          .from(TableNames.exercises)
          .select("*")
          .eq(ExerciseColumns.exercise_type, exercise)
          .limit(1);

        // This probably needs changing in the future
        return {
          exercise_id: data?.[0].exercise_id,
          sets: 3,
          reps: "8-12",
        };
      }
    );

    const defaultExercises = await Promise.all(fetchDefaultExercises);

    const insertDefaultRoutine = {
      [RoutinesColumns.routine_type]: routine,
      [RoutinesColumns.exercises]: defaultExercises,
      [RoutinesColumns.user_id]: userId,
    };

    await this.supabase.from(TableNames.routines).insert(insertDefaultRoutine);
  }

  async updateRoutine(routineId: string, exercises: RoutineExercise[]) {
    const exerciseORM = exercises.map((exercise) => ({
      exercise_id: exercise.exerciseId,
      sets: exercise.sets,
      reps: exercise.reps,
    }));

    await this.supabase
      .from(TableNames.routines)
      .update({ exercises: exerciseORM })
      .eq(RoutinesColumns.routine_id, routineId);
  }

  async logEntry(entries: (LogEntry | undefined)[], userId: string) {
    const data = entries
      .map((entry) => ({
        exercise_id: entry?.exerciseId,
        info: entry?.info,
        user_id: userId,
        date: new Date(),
        notes: entry?.notes,
      }))
      .filter((entry) => entry.exercise_id !== undefined);

    const { error } = await this.supabase
      .from(TableNames.log_entries)
      .insert(data);

    if (error) {
      return false;
    }

    return true;
  }

  /**
   *
   * @param exercisesIds returns exercises with the given ids
   */
  async getExerciseHistory(
    exerciseId: string[],
    userId: string,
    limit: number
  ): Promise<LogEntry[]> {
    const { data, error } = await this.supabase.rpc("get_exercise_history", {
      exercise_ids: exerciseId,
      history_user_id: userId,
      _limit: limit,
    });

    if (data === null) {
      throw new Error("No data returned for exercise history");
    }

    return (data as any[]).map((entry) => ({
      logEntryId: entry.log_entry_id,
      exerciseId: entry.exercise_id,
      info: entry.info,
      date: new Date(entry.date),
      notes: entry.notes,
    }));
  }

  async getExercisePerformance(
    exerciseId: string,
    userId: string,
    month: number,
    year: number
  ): Promise<LogEntry[]> {
    const { data } = await this.supabase
      .from(TableNames.log_entries)
      .select("*")
      .eq(LogEntriesColumns.user_id, userId)
      .eq(LogEntriesColumns.exercise_id, exerciseId)
      .gte(DailyWeighInColumns.date, new Date(year, month, 1).toDateString())
      .lte(
        DailyWeighInColumns.date,
        new Date(year, month + 1, 0).toDateString()
      )
      .order(DailyWeighInColumns.date, { ascending: true });

    return (data as any[]).map((entry) => ({
      logEntryId: entry.log_entry_id,
      exerciseId: entry.exercise_id,
      info: entry.info,
      date: new Date(entry.date),
      notes: entry.notes,
    }));
  }

  async updateExerciseHistory(entry: LogEntry) {
    const { error } = await this.supabase
      .from(TableNames.log_entries)
      .update({
        info: entry.info,
        notes: entry.notes,
      })
      .eq(LogEntriesColumns.log_entry_id, entry.logEntryId);

    if (error) {
      return false;
    }
    return true;
  }

  async getRoutines(routine: RoutineType, userId: string): Promise<Routine> {
    const { data } = await this.supabase
      .from(TableNames.routines)
      .select("*")
      .eq(RoutinesColumns.user_id, userId)
      .eq(RoutinesColumns.routine_type, routine);

    if (data?.length === 0) {
      await this.createDefaultRoutine(routine, userId);
      return this.getRoutines(routine, userId);
    }

    const routineORM = data?.[0] as RoutineORM;
    const parsedExercises = routineORM.exercises.map((exercise) => ({
      exerciseId: exercise.exercise_id,
      sets: exercise.sets,
      reps: exercise.reps,
    }));

    return {
      routineId: routineORM.routine_id,
      routinesType: routineORM.routine_type as RoutineType,
      exercises: parsedExercises,
      userId: routineORM.user_id,
    };
  }

  async getAllExercises(): Promise<Exercise[]> {
    const { data } = await this.supabase
      .from(TableNames.exercises)
      .select("*")
      .order(ExerciseColumns.exercise_id, { ascending: true });

    if (data === null) {
      throw new Error("No data returned for exercises");
    }

    return data.map((exercise) => ({
      exerciseId: exercise.exercise_id,
      exerciseName: exercise.exercise_name,
      exerciseType: exercise.exercise_type,
    }));
  }

  /**
   * May not need this anymore
   * @param page page to get the exercises for
   * @param limit number of exercises to get
   * @returns Exercises
   */
  async getExercisesPagination(
    page: number,
    limit: number
  ): Promise<Exercise[]> {
    const { data } = await this.supabase
      .from(TableNames.exercises)
      .select("*")
      .order(ExerciseColumns.exercise_id, { ascending: true })
      .range((page - 1) * limit, page * limit - 1);

    if (data === null) {
      throw new Error("No data returned for exercises");
    }

    return data.map((exercise) => ({
      exerciseId: exercise.exercise_id,
      exerciseName: exercise.exercise_name,
      exerciseType: exercise.exercise_type,
    }));
  }

  /**
   *
   * @param exerciseIds returns exercises with the given ids. If empty, returns all exercises
   * @returns Exercisees
   */
  async getExercises(exerciseIds?: string[]): Promise<Exercise[]> {
    const selectExercises = this.supabase
      .from(TableNames.exercises)
      .select("*");

    if (exerciseIds) {
      selectExercises.in(ExerciseColumns.exercise_id, exerciseIds);
    }

    const { data } = await selectExercises;

    if (data === null) {
      throw new Error("No data returned for exercises");
    }

    return data.map((exercise) => ({
      exerciseId: exercise.exercise_id,
      exerciseName: exercise.exercise_name,
      exerciseType: exercise.exercise_type,
    }));
  }

  async insertDailyWeighIn(userId: string, weight: number, date: Date) {
    await this.supabase.from(TableNames.daily_weigh_in).insert({
      weight,
      date: date.toDateString(),
      user_id: userId,
    });
  }

  async updateDailyWeighIn(userId: string, weight: number, date: Date) {
    if (weight <= 0) {
      await this.supabase
        .from(TableNames.daily_weigh_in)
        .delete()
        .eq(DailyWeighInColumns.user_id, userId)
        .eq(DailyWeighInColumns.date, date.toISOString());
      return;
    }

    await this.supabase
      .from(TableNames.daily_weigh_in)
      .update({
        weight: weight,
      })
      .eq(DailyWeighInColumns.user_id, userId)
      .eq(DailyWeighInColumns.date, date.toISOString());
  }

  /**
   *
   * @param userId user id for the user to get the weigh ins for
   * @param month month to get the weigh ins for
   * @param year year to get the weigh ins for
   * @returns the month weigh ins that is given and also the previous month
   */
  async getDailyWeighInsForMonth(
    userId: string,
    month: number,
    year: number
  ): Promise<DailyWeighIn[]> {
    const { data } = await this.supabase
      .from(TableNames.daily_weigh_in)
      .select("*")
      .eq(DailyWeighInColumns.user_id, userId)
      .gte(
        DailyWeighInColumns.date,
        new Date(year, month - 1, 1).toDateString()
      )
      .lte(
        DailyWeighInColumns.date,
        new Date(year, month + 1, 0).toDateString()
      )
      .order(DailyWeighInColumns.date, { ascending: true });

    if (data === null) {
      throw new Error("No data returned for daily weigh ins");
    }

    return data.map((weighIn) => ({
      weight: weighIn.weight,
      date: new Date(weighIn.date),
    }));
  }

  async addMeal(
    mealName: string,
    calories: number,
    protein: number,
    userId: string
  ) {
    const insertMeal = {
      [MealsColumns.meal_name]: mealName,
      [MealsColumns.calorie]: calories,
      [MealsColumns.protein]: protein,
      [MealsColumns.date]: new Date().toDateString(),
      [MealsColumns.user_id]: userId,
    };

    await this.supabase.from(TableNames.meals).insert(insertMeal);
  }

  async getMeals(date: Date, userId: string): Promise<Meal[]> {
    const { data } = await this.supabase
      .from(TableNames.meals)
      .select("*")
      .eq(MealsColumns.user_id, userId)
      .eq(MealsColumns.date, date.toDateString());

    if (data === null) {
      throw new Error("No data returned for meals");
    }

    return data.map((meal) => ({
      id: meal.id,
      mealName: meal.meal_name,
      calories: meal.calorie,
      protein: meal.protein,
      date: new Date(meal.date),
    }));
  }

  async deleteMeal(mealId: string) {
    await this.supabase
      .from(TableNames.meals)
      .delete()
      .eq(MealsColumns.id, mealId);
  }

  async deleteLogEntry(logEntryId: string) {
    const { error } = await this.supabase
      .from(TableNames.log_entries)
      .delete()
      .eq(LogEntriesColumns.log_entry_id, logEntryId);

    if (!error) {
      return true;
    }
    return false;
  }
}

export default LiftHouseDatabase;
