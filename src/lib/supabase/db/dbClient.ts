import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServer } from "../server";
import { Workout } from "./types";
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

  async getWorkouts(userId: string): Promise<Workout[]> {
    const { data, error } = await this.supabase
      .from("workouts")
      .select("*")
      .eq("user_id", userId);

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

  async createWorkout(userId: string, name: string, description?: string) {
    const { data, error } = await this.supabase
      .from("workouts")
      .insert([
        { name, description, exercises: [], user_id: userId, type: "custom" },
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
    workoutId: string
  ) {
    console.log(name, description, exercises, workoutId);
    const { error } = await this.supabase
      .from("workouts")
      .update({ name, description, exercises })
      .match({ workout_id: workoutId });

    if (error) {
      throw error;
    }
  }
}
