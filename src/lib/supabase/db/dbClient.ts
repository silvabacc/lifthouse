import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServer } from "../server";
import {
  Exercise,
  FiveThreeOne,
  LogEntry,
  Meal,
  TemplateSetup,
  Weight,
  Workout,
  WorkoutTemplate,
} from "./types";
import { cookies } from "next/headers";

export default class DatabaseClient {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase URL or key");
    }

    const cookieStore = cookies();

    this.supabase = createSupabaseServer(cookieStore);
  }

  async getExercises(exerciseIds?: number[]): Promise<Exercise[]> {
    const query = this.supabase
      .from("exercises_two")
      .select("*")
      .order("exercise_name", { ascending: true });

    if (exerciseIds) {
      query.in("exercise_id", exerciseIds);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data.map((data) => ({
      exerciseId: data.exercise_id,
      name: data.exercise_name,
      notes: data.notes,
      exerciseType: JSON.parse(
        data.exercise_type.replace(/[\u201C\u201D]/g, '"')
      ),
      youtubeId: data.youtube_id,
      primaryMuscleGroup: data.primary_muscle_group,
    }));
  }

  async getWorkouts(): Promise<Workout[]> {
    const userId = await this.getUserId();

    const { data, error } = await this.supabase
      .from("workouts")
      .select("*")
      .eq("user_id", userId)
      .order("workout_id", { ascending: true });

    if (error) {
      throw error;
    }

    return data.map((data) => ({
      workoutId: data.workout_id,
      name: data.name,
      description: data.description,
      exercises: data.exercises,
      template: data.template,
    }));
  }

  async getWorkoutData(workoutId: string): Promise<Workout> {
    const { data, error } = await this.supabase
      .from("workouts")
      .select("*")
      .eq("workout_id", workoutId);

    if (error) {
      throw error;
    }

    return {
      workoutId: data[0].workout_id,
      name: data[0].name,
      description: data[0].description,
      exercises: data[0].exercises,
      template: data[0].template,
    };
  }

  async createWorkout(name: string, description?: string) {
    const userId = await this.getUserId();
    const { data, error } = await this.supabase
      .from("workouts")
      .insert([
        {
          name,
          description,
          exercises: [],
          user_id: userId,
          template: "custom",
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return data.map((data) => ({
      workoutId: data.workout_id,
      name: data.name,
      description: data.description,
      exercises: data.exercises,
    }));
  }

  async deleteWorkout(workoutId: string) {
    const { error } = await this.supabase
      .from("workouts")
      .delete()
      .match({ workout_id: workoutId });

    if (error) {
      throw error;
    }
  }

  async updateWorkout(
    name: string,
    description: string,
    exercises: number[],
    workoutId: string,
    template: WorkoutTemplate
  ): Promise<Workout> {
    const { data, error } = await this.supabase
      .from("workouts")
      .update({ name, description, exercises, template })
      .match({ workout_id: workoutId })
      .select();

    if (error) {
      throw error;
    }

    return {
      workoutId: data[0].workout_id,
      name: data[0].name,
      description: data[0].description,
      exercises: data[0].exercises,
      template: data[0].template,
    };
  }

  async getTemplateSetup(template: WorkoutTemplate): Promise<TemplateSetup> {
    const { data, error } = await this.supabase
      .from("template_setups")
      .select("*")
      .eq("template", template);

    if (error) {
      throw error;
    }

    return {
      setupId: data[0].id,
      template: data[0].template,
      exercises: data[0].exercises,
    };
  }

  async getUserId() {
    const userId = (await this.supabase.auth.getSession()).data.session?.user
      .id;
    return userId;
  }

  async getLatestLogs(exerciseIds: number[]) {
    const userId = await this.getUserId();

    const { data, error } = await this.supabase.rpc("get_latest_logs", {
      exercise_ids: exerciseIds,
      history_user_id: userId,
    });

    if (error) {
      throw error;
    }

    return (data as any[]).map((data) => ({
      logId: data.log_entry_id,
      exerciseId: parseInt(data.exercise_id),
      info: data.info,
      notes: data.notes,
      date: data.date,
    }));
  }

  async getLogs(
    exerciseIds: number[],
    rows: number = 20,
    startFrom?: number,
    endOn?: number
  ) {
    const userId = await this.getUserId();

    let query;
    if (startFrom && endOn) {
      query = this.supabase
        .from("log_entries")
        .select("*")
        .in("exercise_id", exerciseIds)
        .eq("user_id", userId)
        .gte("date", startFrom)
        .lte("date", endOn)
        .order("date", { ascending: true });
    } else {
      query = this.supabase.rpc("get_limited_logs", {
        exercise_ids: exerciseIds,
        user_id: userId,
        rows,
      });
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return (data as any[]).map((data) => ({
      logId: data.log_entry_id,
      exerciseId: parseInt(data.exercise_id),
      info: data.info,
      notes: data.notes,
      date: data.date,
    }));
  }

  async setLogs(logs: LogEntry[]): Promise<LogEntry[]> {
    const userId = await this.getUserId();
    const insertLogs = logs.map((log) => ({
      exercise_id: log.exerciseId,
      info: log.info,
      notes: log.notes,
      date: log.date,
      user_id: userId,
    }));

    const { data, error } = await this.supabase
      .from("log_entries")
      .insert(insertLogs)
      .select();

    if (error) {
      throw error;
    }

    return data.map((data) => ({
      logId: data.log_entry_id,
      exerciseId: parseInt(data.exercise_id),
      info: data.info,
      notes: data.notes,
      date: data.date,
    }));
  }

  async deleteLog(logId: number) {
    const userId = await this.getUserId();

    const { error } = await this.supabase
      .from("log_entries")
      .delete()
      .match({ log_entry_id: logId, user_id: userId });

    if (error) {
      throw error;
    }
  }

  async getWeight(month: number, year: number): Promise<Weight[]> {
    const userId = await this.getUserId();

    const { data, error } = await this.supabase
      .from("daily_weigh_in")
      .select()
      .eq("user_id", userId)
      .gte("date", new Date(year, month, 1).toDateString())
      .lte("date", new Date(year, month + 1, 0).toDateString())
      .order("date", { ascending: true });

    if (error) {
      throw error;
    }

    return data.map((data) => ({
      id: data.daily_weigh_in_id,
      date: data.date,
      weight: data.weight,
    }));
  }

  async deleteWeight(weightId: number): Promise<void> {
    const userId = await this.getUserId();

    const { error } = await this.supabase
      .from("daily_weigh_in")
      .delete()
      .match({ daily_weigh_in_id: weightId, user_id: userId });

    if (error) {
      throw error;
    }
  }

  async updateWeight(weightId: number, weight: number): Promise<Weight> {
    const userId = await this.getUserId();

    const { data, error } = await this.supabase
      .from("daily_weigh_in")
      .update({ weight })
      .match({ daily_weigh_in_id: weightId, user_id: userId })
      .select();

    if (error) {
      throw error;
    }

    return {
      id: data[0].daily_weigh_in_id,
      date: data[0].date,
      weight: data[0].weight,
    };
  }

  async createWeight(weight: number, date: Date): Promise<Weight> {
    const userId = await this.getUserId();

    const { data, error } = await this.supabase
      .from("daily_weigh_in")
      .insert([{ weight, user_id: userId, date }])
      .select();

    if (error) {
      throw error;
    }

    return {
      id: data[0].daily_weigh_in_id,
      date: data[0].date,
      weight: data[0].weight,
    };
  }

  async getMeals(day: string): Promise<Meal[]> {
    const userId = await this.getUserId();

    const { data, error } = await this.supabase
      .from("meals")
      .select("*")
      .eq("user_id", userId)
      .eq("date", day);

    if (error) {
      throw error;
    }

    return data.map((data) => ({
      id: data.id,
      mealName: data.meal_name,
      calorie: data.calorie,
      protein: data.protein,
      date: data.date,
      carbs: data.carbs,
      fat: data.fat,
    }));
  }

  async deleteMeal(mealId: string): Promise<void> {
    const userId = await this.getUserId();

    const { error } = await this.supabase
      .from("meals")
      .delete()
      .match({ id: mealId, user_id: userId });

    if (error) {
      throw error;
    }
  }

  async addMeal(
    mealTitle: string,
    nutrients: { calories: number; protein: number; fat: number; carbs: number }
  ): Promise<Meal> {
    const userId = await this.getUserId();

    const { data, error } = await this.supabase
      .from("meals")
      .insert([
        {
          meal_name: mealTitle,
          calorie: nutrients.calories,
          protein: nutrients.protein,
          carbs: nutrients.carbs,
          fat: nutrients.fat,
          user_id: userId,
          date: new Date().toDateString(),
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return {
      id: data[0].id,
      mealName: data[0].meal_name,
      calorie: data[0].calories,
      protein: data[0].protein,
      date: data[0].date,
      carbs: data[0].carbs,
      fat: data[0].fat,
    };
  }

  async getFiveThreeOne(): Promise<FiveThreeOne> {
    const userId = await this.getUserId();

    const exercieData = await this.getFiveThreeOneExercises();

    const { data, error } = await this.supabase
      .from("five_three_one")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return {
        bench: { exercise: exercieData[1], pb: 0 },
        squat: { exercise: exercieData[0], pb: 0 },
        deadlift: { exercise: exercieData[2], pb: 0 },
        ohp: { exercise: exercieData[3], pb: 0 },
      } as FiveThreeOne;
    }

    return this.transformDataToFiveThreeOne(exercieData, data);
  }

  async setFiveThreeOne(info: {
    bench: number;
    squat: number;
    deadlift: number;
    ohp: number;
  }): Promise<FiveThreeOne> {
    const userId = await this.getUserId();

    const { data, error } = await this.supabase
      .from("five_three_one")
      .upsert({ ...info, user_id: userId }, { onConflict: "user_id" })
      .select();

    const exercieData = await this.getFiveThreeOneExercises();

    if (error) {
      throw error;
    }

    return this.transformDataToFiveThreeOne(exercieData, data);
  }

  async getFiveThreeOneExercises(): Promise<Exercise[]> {
    const FiveThreeOneExercisesIds = [2, 22, 119, 126];
    return this.getExercises(FiveThreeOneExercisesIds);
  }

  //* Helper functions *//
  transformDataToFiveThreeOne(
    exercieData: Exercise[],
    data: any
  ): FiveThreeOne {
    return {
      id: data[0].id,
      bench: { exercise: exercieData[1], pb: data[0].bench },
      squat: { exercise: exercieData[0], pb: data[0].squat },
      deadlift: { exercise: exercieData[2], pb: data[0].deadlift },
      ohp: { exercise: exercieData[3], pb: data[0].ohp },
    } as FiveThreeOne;
  }
}
