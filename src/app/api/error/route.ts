import DatabaseClient from "@/lib/supabase/db/dbClient";

export async function POST(request: Request) {
  const dbClient = new DatabaseClient();

  const res = await request.json();
  return Response.json({ res });
}
