import DatabaseClient from "@/lib/supabase/db/dbClient";
import { WorkoutTemplate } from "@/lib/supabase/db/types";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl;
  const params = searchParams.searchParams.get("workoutId");

  if (!params) {
    return NextResponse.json("workoutId is undefined", { status: 400 });
  }

  const dbClient = await DatabaseClient.build();
  const workout = await dbClient.getWorkoutData(params);
  return NextResponse.json(workout);
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl;
  const params = searchParams.searchParams.get("workoutId");

  if (!params) {
    return NextResponse.json("workoutId is undefined", { status: 400 });
  }

  const dbClient = await DatabaseClient.build();
  await dbClient.deleteWorkout(params);
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl;
  const params = searchParams.searchParams.get("workoutId");

  const body = await request.json();
  try {
    const schema = Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().allow("").optional(),
      exercises: Joi.array()
        .items(
          Joi.object({
            exerciseId: Joi.number().required(),
            sets: Joi.number().required(),
            reps: Joi.string().required(),
          })
        )
        .optional(),
      template: Joi.string()
        .valid(...Object.values(WorkoutTemplate))
        .optional(),
      updateTemplate: Joi.boolean().optional(),
    });

    if (!params) {
      throw new Error("weightId is undefined");
    }

    await schema.validateAsync(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const dbClient = await DatabaseClient.build();
  const { name, description, exercises, template, updateTemplate } = body;

  let updatedExercises = exercises;
  if (updateTemplate) {
    const setup = await dbClient.getTemplateSetup(template);
    updatedExercises = setup.exercises;
  }

  const workout = await dbClient.updateWorkout(
    name,
    description,
    updatedExercises,
    params,
    template
  );

  return NextResponse.json(workout);
}
