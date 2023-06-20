import { SupabaseClient, User, createClient } from "@supabase/supabase-js";
import getConfig from "../config";
import { routineSetup } from "../data";
import {
  ExercisesColumns,
  RoutineORM,
  RoutinesColumns,
  TableNames,
} from "./types";
import { Routine, RoutineType } from "@backend/types";

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
          .eq(ExercisesColumns.exercise_type, exercise)
          .limit(1);

        // This probably needs changing in the future
        return {
          exercise_id: data?.[0].exercise_id,
          sets: 8,
          reps: "12",
        };
      }
    );

    const defaultExercises = await Promise.all(fetchDefaultExercises);
    const stringifedDefaultExercises = defaultExercises.map((exercise) =>
      JSON.stringify(exercise).replace("[", "{").replace("]", "}")
    );

    const insertDefaultRoutine = {
      [RoutinesColumns.routine_type]: routine,
      [RoutinesColumns.exercises]: stringifedDefaultExercises,
      [RoutinesColumns.user_id]: userId,
    };

    await this.supabase.from(TableNames.routines).insert(insertDefaultRoutine);
  }

  public async getRoutines(
    routine: RoutineType,
    userId: string
  ): Promise<Routine> {
    const { data, error } = await this.supabase
      .from(TableNames.routines)
      .select("*")
      .eq(RoutinesColumns.user_id, userId)
      .eq(RoutinesColumns.routine_type, routine);

    if (data === null) {
      throw new Error("No data returned");
    }

    if (data?.length === 0) {
      await this.createDefaultRoutine(routine, userId);
      return this.getRoutines(routine, userId);
    }

    const routineORM = data[0] as RoutineORM;
    const parsedExercises = routineORM.exercises.map((exercise) => ({
      ...JSON.parse(exercise),
    }));

    return {
      routineId: routineORM.routine_id,
      routinesType: routineORM.routine_type,
      exercises: parsedExercises,
      userId: routineORM.user_id,
    };
  }
}

export default LiftHouseDatabase;
