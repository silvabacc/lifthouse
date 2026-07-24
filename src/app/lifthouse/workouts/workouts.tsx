"use client";

import { useOptimistic, useTransition } from "react";
import AddWorkoutCard from "./components/addWorkoutCard";
import WorkoutCard from "./components/workoutCard";
import { Workout } from "@/lib/supabase/db/types";
import { deleteWorkout } from "./actions";

type Props = {
  initialWorkouts: Workout[];
};

export default function Workouts({ initialWorkouts }: Props) {
  const [, startTransition] = useTransition();
  const [workouts, optimisticDelete] = useOptimistic(
    initialWorkouts,
    (state, deletedId: number) =>
      state.filter((w) => w.workoutId !== deletedId),
  );

  const onDelete = (workoutId: number) => {
    startTransition(async () => {
      optimisticDelete(workoutId);
      await deleteWorkout(workoutId);
    });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.workoutId} {...workout} onDelete={onDelete} />
      ))}
      <AddWorkoutCard />
    </div>
  );
}
