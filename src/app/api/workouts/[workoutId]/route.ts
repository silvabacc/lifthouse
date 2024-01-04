import DatabaseClient from "@/lib/supabase/db/dbClient";
import { WorkoutTemplate } from "@/lib/supabase/db/types";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { workoutId: string } }
) {
  const dbClient = new DatabaseClient();
  const workout = await dbClient.getWorkoutData(params.workoutId);
  return NextResponse.json(workout);
}

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

    await schema.validateAsync(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const dbClient = new DatabaseClient();
  const { name, description, exercises, template, updateTemplate } = body;

  let updatedExercises = exercises;
  if (updateTemplate) {
    const setup = await dbClient.getTemplateSetup(template);
    updatedExercises = setup.exercises;
  }

  await dbClient.updateWorkout(
    name,
    description,
    updatedExercises,
    params.workoutId,
    template
  );

  return NextResponse.json({
    name,
    description,
    exercises: updatedExercises,
    template,
  });
}
