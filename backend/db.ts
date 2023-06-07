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
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, ANON_PUBLIC_KEY);
  }
}

export default LiftHouseDatabase;
