"use client";

import { useEffect, useState } from "react";
import AddWorkoutCard from "./components/addWorkoutCard";
import WorkoutCard from "./components/workoutCard";
import { useWorkout } from "./hooks/useWorkout";
import { Workout } from "@/lib/supabase/db/types";
import WorkoutSkeleton from "./workouts.skeleton";
import WorkoutTutorial from "./workouts.tutorial";

export default function Workouts() {
  const { fetchWorkouts, deleteWorkoutPlan } = useWorkout();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const workouts = await fetchWorkouts();
      setWorkouts(workouts);
      setIsLoading(false);
    };

    fetch();
  }, []);

  if (isLoading) {
    return <WorkoutSkeleton />;
  }

  const onDelete = async (workoutId: number) => {
    await deleteWorkoutPlan(workoutId);
    setWorkouts((workouts) =>
      workouts.filter((w) => w.workoutId !== workoutId)
    );
  };

  const onWorkoutUpdate = (workout: Workout) => {
    setWorkouts((workouts) =>
      workouts.map((w) => (w.workoutId === workout.workoutId ? workout : w))
    );
  };

  return (
    <div>
      <WorkoutTutorial />
      <div className="grid lg:grid-cols-3 gap-4">
        {workouts?.map((workout) => (
          <WorkoutCard
            key={workout.workoutId}
            {...workout}
            onDelete={onDelete}
            onWorkoutUpdate={onWorkoutUpdate}
          />
        ))}
        <AddWorkoutCard setWorkouts={setWorkouts} />
      </div>
    </div>
  );
}
