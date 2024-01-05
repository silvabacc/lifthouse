import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServer } from "../server";
import { Exercise, TemplateSetup, Workout, WorkoutTemplate } from "./types";
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
      exerciseType: data.exercise_type,
      primaryMuscleGroup: data.primary_muscle_group,
    }));
  }

  async getWorkouts(userId: string): Promise<Workout[]> {
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
      userId: data.user_id,
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
      userId: data[0].user_id,
      template: data[0].template,
    };
  }

  async createWorkout(userId: string, name: string, description?: string) {
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
      userId: data.user_id,
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
  ) {
    const { error } = await this.supabase
      .from("workouts")
      .update({ name, description, exercises, template })
      .match({ workout_id: workoutId });

    if (error) {
      throw error;
    }
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

  async getLogs(
    userId: string,
    exerciseIds: number[],
    startFrom: number,
    endOn: number
  ) {
    console.log(userId, exerciseIds, startFrom, endOn);
    const { data, error } = await this.supabase
      .from("log_entries")
      .select("*")
      .in("exercise_id", exerciseIds)
      .eq("user_id", userId)
      .gte("date", startFrom)
      .lte("date", endOn);

    if (error) {
      throw error;
    }

    console.log("data!!!", data);

    return data.map((data) => ({
      logId: data.log_entry_id,
      userId: data.user_id,
      exerciseId: data.exercise_id,
      info: data.info,
      notes: data.notes,
      date: data.date,
    }));
  }
}
