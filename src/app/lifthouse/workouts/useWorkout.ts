"use client";

import { useAppContext } from "@/app/context";
import getConfig from "@/config";
import { Workout } from "@/lib/supabase/db/types";
import { useEffect, useState } from "react";

const { baseUrl } = getConfig();

export function useWorkout() {
  const { user } = useAppContext();

  const fetchWorkouts = async () => {
    const response = await fetch(`${baseUrl}/api/workouts`, {
      method: "POST",
      body: JSON.stringify({ userId: user?.id }),
    });

    const data = (await response.json()) as Workout[];
    return data;
  };

  const deleteWorkoutPlan = async (id: number) => {
    await fetch(`${baseUrl}/api/workouts/${id}`, {
      method: "DELETE",
    });
  };

  /**
   * @returns The workout that was created
   */
  const createWorkoutPlan = async (name: string, description?: string) => {
    const response = await fetch(`${baseUrl}/api/workouts/create`, {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        name: name,
        description: description,
      }),
    });

    const workout = ((await response.json()) as Workout[])[0];
    return workout;
  };

  return {
    deleteWorkoutPlan,
    createWorkoutPlan,
    fetchWorkouts,
  };
}
