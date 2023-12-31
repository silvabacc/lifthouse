import DatabaseClient from "@/lib/supabase/db/dbClient";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: { workoutId: string } }
) {
  const dbClient = new DatabaseClient();
  await dbClient.deleteWorkout(params.workoutId);
  return NextResponse.json({ success: true });
}

export async function PUT(
  request: Request,
  { params }: { params: { workoutId: string } }
) {
  const body = await request.json();
  try {
    const schema = Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      exercises: Joi.array().items(Joi.number()).optional(),
    });

    await schema.validateAsync(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const dbClient = new DatabaseClient();
  const { name, description, exercises } = body;
  await dbClient.updateWorkout(name, description, exercises, params.workoutId);
  return NextResponse.json({ success: true });
}
