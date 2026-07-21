import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import getConfig from "@/config";

export const createSupabaseServer = (
  cookieStore: Awaited<ReturnType<typeof cookies>>
) => {
  const { supabaseUrl, supabaseKey } = getConfig();
  return createServerClient(supabaseUrl, supabaseKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
