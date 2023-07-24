import { SupabaseClient, User, createClient } from "@supabase/supabase-js";
import getConfig from "../config";
import { routineSetup } from "../data";
import {
  DailyWeighInColumns,
  ExerciseColumns,
  LogEntriesColumns,
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

  logEntry(entries: (LogEntry | undefined)[], userId: string) {
    entries.map(async (entry) => {
      if (entry) {
        await this.supabase.from(TableNames.log_entries).insert({
          exercise_id: entry.exerciseId,
          info: entry.info,
          user_id: userId,
          date: new Date(),
          notes: entry.notes,
        });
      }
    });
  }

  /**
   *
   * @param exercisesIds returns exercises with the given ids. If empty, returns all exercises
   */
  async getExerciseHistory(
    exerciseId: string,
    userId: string
  ): Promise<LogEntry[]> {
    const { data } = await this.supabase
      .from(TableNames.log_entries)
      .select("*")
      .eq(LogEntriesColumns.exercise_id, exerciseId)
      .eq(LogEntriesColumns.user_id, userId);

    if (data === null) {
      throw new Error("No data returned for exercise history");
    }

    return data.map((entry) => ({
      exerciseId: entry.exercise_id,
      info: entry.info,
      date: new Date(entry.date),
      notes: entry.notes,
    }));
  }

  async getRoutines(routine: RoutineType, userId: string): Promise<Routine> {
    const { data } = await this.supabase
      .from(TableNames.routines)
      .select("*")
      .eq(RoutinesColumns.user_id, userId)
      .eq(RoutinesColumns.routine_type, routine);

    if (data?.length === 0 || data === null) {
      await this.createDefaultRoutine(routine, userId);
      return this.getRoutines(routine, userId);
    }

    const routineORM = data[0] as RoutineORM;
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
      date,
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

  async getDailyWeighInsForMonth(
    userId: string,
    month: number,
    year: number
  ): Promise<DailyWeighIn[]> {
    const { data } = await this.supabase
      .from(TableNames.daily_weigh_in)
      .select("*")
      .eq(DailyWeighInColumns.user_id, userId)
      .gte(DailyWeighInColumns.date, new Date(year, month, 1).toDateString())
      .lte(
        DailyWeighInColumns.date,
        new Date(year, month + 1, 0).toDateString()
      );

    if (data === null) {
      throw new Error("No data returned for daily weigh ins");
    }

    return data.map((weighIn) => ({
      weight: weighIn.weight,
      date: new Date(weighIn.date),
    }));
  }
}

export default LiftHouseDatabase;
