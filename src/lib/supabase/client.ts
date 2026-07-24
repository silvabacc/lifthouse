import { createBrowserClient } from "@supabase/ssr";
import getConfig from "@/config";

export const createSupabaseClient = () => {
  const { supabaseUrl, supabaseKey } = getConfig();
  return createBrowserClient(supabaseUrl, supabaseKey);
};
