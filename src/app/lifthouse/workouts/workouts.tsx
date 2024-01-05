"use client";

import { useEffect, useState } from "react";
import AddWorkoutCard from "./components/addWorkoutCard";
import WorkoutCard from "./components/workoutCard";
import { useWorkout } from "./hooks/useWorkout";
import { Workout } from "@/lib/supabase/db/types";

export default function Workouts() {
  const { fetchWorkouts, deleteWorkoutPlan } = useWorkout();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const workouts = await fetchWorkouts();
      setWorkouts(workouts);
      setLoading(false);
    };

    fetch();
  }, []);

  if (isLoading) {
    return <>Workouts Skeleton Placeholder</>;
  }

  const onDelete = async (workoutId: number) => {
    await deleteWorkoutPlan(workoutId);
    setWorkouts((workouts) =>
      workouts.filter((w) => w.workoutId !== workoutId)
    );
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {workouts?.map((workout) => {
        return (
          <WorkoutCard
            key={workout.workoutId}
            {...workout}
            onDelete={onDelete}
          />
        );
      })}
      <AddWorkoutCard setWorkouts={setWorkouts} />
    </div>
  );
}
