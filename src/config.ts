/**
 * Centralised runtime configuration.
 *
 * Fails fast with a clear message when required environment variables are
 * missing, instead of surfacing as an opaque Supabase error deep in a
 * request. See .env.example for the full list.
 */
export default function getConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example)."
    );
  }

  return {
    supabaseUrl,
    supabaseKey,
    pageUrl: process.env.NEXT_PUBLIC_PAGE_URL || "/lifthouse",
  };
}
