import { SupabaseClient, createClient } from "@supabase/supabase-js";
import getConfig from "../config";

const { SUPABASE_URL, ANON_PUBLIC_KEY } = getConfig();

class Bucket {
  private supabase: SupabaseClient;
  private exerciseImageBucket: string;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, ANON_PUBLIC_KEY, {
      auth: { autoRefreshToken: true },
    });
    this.exerciseImageBucket = "exercises";
  }

  getExerciseImageUrl(exerciseId: string) {
    return this.supabase.storage
      .from(this.exerciseImageBucket)
      .getPublicUrl(exerciseId).data.publicUrl;
  }
}

export default Bucket;
