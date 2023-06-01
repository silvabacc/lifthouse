import { SupabaseClient, createClient } from "@supabase/supabase-js";
import getConfig from "./config";
import { exercises } from "./data";

const { SUPABASE_URL, ANON_PUBLIC_KEY } = getConfig();

export enum TableNames {
  routines = "routines",
  exercises = "exercises",
  log_entries = "log_entries",
}

class LiftHouseDatabase {
  private static instance: LiftHouseDatabase;
  private supabase: SupabaseClient;

  private constructor() {
    this.supabase = createClient(SUPABASE_URL, ANON_PUBLIC_KEY);

    // Create default Routines if user doesn't have it
  }

  public static getInstance(): LiftHouseDatabase {
    if (!LiftHouseDatabase.instance) {
      LiftHouseDatabase.instance = new LiftHouseDatabase();
    }

    return LiftHouseDatabase.instance;
  }
}

export default LiftHouseDatabase;
