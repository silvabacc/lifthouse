import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServer } from "../server";
import { Exercise, Workout, WorkoutTemplate } from "./types";
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
    console.log(name, description, exercises, workoutId);
    const { error } = await this.supabase
      .from("workouts")
      .update({ name, description, exercises, template })
      .match({ workout_id: workoutId });

    if (error) {
      throw error;
    }
  }
}
