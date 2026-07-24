"use server";

import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { ExerciseConfiguration, Workout, WorkoutTemplate } from "@/lib/supabase/db/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteWorkout(workoutId: number): Promise<void> {
  const db = await createDatabaseClient();
  await db.deleteWorkout(String(workoutId));
  revalidatePath("/lifthouse/workouts");
}

export async function createWorkout(
  name: string,
  description?: string
): Promise<never> {
  const db = await createDatabaseClient();
  const [workout] = await db.createWorkout(name, description);
  redirect(`/lifthouse/workouts/${workout.workoutId}`);
}

export async function updateWorkoutMeta(
  workoutId: number,
  name: string,
  description: string
): Promise<Workout> {
  const db = await createDatabaseClient();
  const workout = await db.updateWorkout(name, description, undefined as any, String(workoutId), undefined as any);
  revalidatePath("/lifthouse/workouts");
  return workout;
}

export async function updateWorkoutExercises(
  workoutId: number,
  exercises: ExerciseConfiguration[]
): Promise<Workout> {
  const db = await createDatabaseClient();
  const workout = await db.updateWorkout(undefined as any, undefined as any, exercises as any, String(workoutId), undefined as any);
  revalidatePath("/lifthouse/workouts");
  return workout;
}

export async function applyWorkoutTemplate(
  workoutId: number,
  template: WorkoutTemplate
): Promise<Workout> {
  const db = await createDatabaseClient();
  let exercises: ExerciseConfiguration[] | undefined;
  if (template !== WorkoutTemplate.custom) {
    const setup = await db.getTemplateSetup(template);
    exercises = setup.exercises;
  }
  const workout = await db.updateWorkout(undefined as any, undefined as any, exercises as any, String(workoutId), template);
  revalidatePath("/lifthouse/workouts");
  return workout;
}
