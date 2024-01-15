"use client";

import { useAppContext } from "@/app/context";
import { useFetch } from "@/app/hooks/useFetch";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import {
  Workout,
  WorkoutExercise,
  WorkoutTemplate,
} from "@/lib/supabase/db/types";
import { useWorkoutIdContext } from "../[workoutId]/context";

export function useWorkout() {
  const { fetch } = useFetch();
  const { workout } = useWorkoutIdContext();
  const { getCachedLogInfo } = useLocalStorage();

  const fetchWorkouts = async () => {
    const response: Workout[] = await fetch(`/api/workouts`);
    return response;
  };

  const deleteWorkoutPlan = async (id: number) => {
    await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });
  };

  type UpdateWorkoutPlanReturn = {
    workoutId: number;
    name?: string;
    description?: string;
    exercises?: WorkoutExercise[];
    template?: WorkoutTemplate;
  };
  const updateWorkoutPlan = async ({
    workoutId,
    name,
    description,
    exercises,
    template,
  }: UpdateWorkoutPlanReturn) => {
    if (!name && !description && !exercises && !template) {
      return;
    }

    const response: Workout = await fetch(`/api/workouts/${workoutId}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        description,
        exercises,
        template,
      }),
    });

    return response;
  };

  const updateTemplate = async (
    workoutId: number,
    template: WorkoutTemplate
  ) => {
    const response: Workout = await fetch(`/api/workouts/${workoutId}`, {
      method: "PUT",
      body: JSON.stringify({
        template,
        updateTemplate: template !== WorkoutTemplate.custom,
      }),
    });

    return response;
  };

  /**
   * @returns The workout that was created
   */
  const createWorkoutPlan = async (name: string, description?: string) => {
    const response: Workout[] = await fetch(`/api/workouts/create`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });

    return response[0];
  };

  const finishWorkout = async () => {
    const logs = workout.exercises.map((exercise) => {
      const cached = getCachedLogInfo(exercise.exerciseId);
      return {
        exerciseId: exercise.exerciseId,
        info: cached?.info,
        notes: cached?.notes,
        date: new Date(),
      };
    });

    await fetch("/api/logs/create", {
      method: "POST",
      body: JSON.stringify(logs),
    });
  };

  return {
    deleteWorkoutPlan,
    createWorkoutPlan,
    fetchWorkouts,
    updateWorkoutPlan,
    updateTemplate,
    finishWorkout,
  };
}
