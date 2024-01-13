import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServer } from "../server";
import {
  Exercise,
  ExerciseType,
  LogEntry,
  LogInfo,
  TemplateSetup,
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

  async setLogs(info: {
    exerciseId: string;
    date: Date;
    notes?: string;
    info: LogInfo;
  }): Promise<LogEntry> {
    const userId = await this.getUserId();

    const { data, error } = await this.supabase
      .from("log_entries")
      .insert([
        {
          user_id: userId,
          exercise_id: info.exerciseId,
          date: info.date,
          notes: info.notes,
          info: info.info,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return {
      logId: data[0].log_entry_id,
      exerciseId: parseInt(data[0].exercise_id),
      info: data[0].info,
      notes: data[0].notes,
      date: data[0].date,
    };
  }
}
