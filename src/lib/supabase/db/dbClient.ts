import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServer } from "../server";
import {
  Exercise,
  LogEntry,
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

  async getExercises(): Promise<Exercise[]> {
    const { data, error } = await this.supabase
      .from("exercises_two")
      .select("*")
      .order("exercise_name", { ascending: true });

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

  async getLogs(exerciseIds: number[], startFrom: number, endOn: number) {
    const userId = await this.getUserId();

    const { data, error } = await this.supabase
      .from("log_entries")
      .select("*")
      .in("exercise_id", exerciseIds)
      .eq("user_id", userId)
      .gte("date", startFrom)
      .lte("date", endOn)
      .order("date", { ascending: true });

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
}
