interface Config {
  SUPABASE_URL: string;
  ANON_PUBLIC_KEY: string;
}

const getConfig = (): Config => ({
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || "",
  ANON_PUBLIC_KEY: import.meta.env.VITE_ANON_PUBLIC_KEY || "",
});

export default getConfig;
