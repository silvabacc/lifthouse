"use client";

import { useAppContext } from "@/app/context";
import { useFetch } from "@/app/hooks/useFetch";
import {
  Workout,
  WorkoutExercise,
  WorkoutTemplate,
} from "@/lib/supabase/db/types";

export function useWorkout() {
  const { user } = useAppContext();
  const { fetch } = useFetch();

  const fetchWorkouts = async () => {
    const response: Workout[] = await fetch(`/api/workouts`, {
      method: "POST",
      body: JSON.stringify({ userId: user?.id }),
    });

    return response;
  };

  const deleteWorkoutPlan = async (id: number) => {
    await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });
  };

  const fetchWorkoutData = async (workoutId: number) => {
    const response: Workout = await fetch(`/api/workouts/${workoutId}`);
    return response;
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

    const response: { success: boolean } = await fetch(
      `/api/workouts/${workoutId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name,
          description,
          exercises,
          template,
        }),
      }
    );

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
        updateTemplate: true,
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
        userId: user?.id,
        name: name,
        description: description,
      }),
    });

    return response[0];
  };

  return {
    deleteWorkoutPlan,
    createWorkoutPlan,
    fetchWorkouts,
    fetchWorkoutData,
    updateWorkoutPlan,
    updateTemplate,
  };
}
