"use client";

import { useAppContext } from "@/app/context";
import { useFetch } from "@/app/hooks/useFetch";
import getConfig from "@/config";
import { Workout } from "@/lib/supabase/db/types";
import { useEffect, useState } from "react";

const { baseUrl } = getConfig();

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
  };
}
