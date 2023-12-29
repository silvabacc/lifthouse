import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Workout } from "./types";

export default class DatabaseClient {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase URL or key");
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getWorkouts(userId: string): Promise<Workout[]> {
    const { data, error } = await this.supabase
      .from("workouts")
      .select("*")
      .eq("user_id", userId);

    console.log("data", data);

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
}
