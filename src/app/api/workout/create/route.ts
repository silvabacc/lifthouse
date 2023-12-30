import DatabaseClient from "@/lib/supabase/db/dbClient";

export async function POST(request: Request) {
  const dbClient = new DatabaseClient();

  const { userId, name, description } = await request.json();

  const result = await dbClient.createWorkout(userId, name, description);

  return Response.json(result);
}
