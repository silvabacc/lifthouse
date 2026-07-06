export default function getConfig() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    pageUrl: process.env.NEXT_PUBLIC_PAGE_URL || "/lifthouse",
  };
}
