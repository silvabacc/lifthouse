"use client";

import { useAppContext } from "@/app/context";
import getConfig from "@/config";
import { Workout } from "@/lib/supabase/db/types";
import { useEffect, useState } from "react";

const { baseUrl } = getConfig();

export function useWorkout() {
  const { user } = useAppContext();
  const [workouts, setWorkouts] = useState<Workout[]>();
  const [isLoading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/workouts`, {
        method: "POST",
        body: JSON.stringify({ userId: user?.id }),
      });

      const data = (await response.json()) as Workout[];
      setWorkouts(data);
      setLoading(false);
    };

    fetchWorkouts();
  }, []);

  return { workouts, isLoading };
}
