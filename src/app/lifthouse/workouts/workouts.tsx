"use client";

import { useState } from "react";
import AddWorkoutCard from "./components/addWorkoutCard";
import WorkoutCard from "./components/workoutCard";
import { useWorkout } from "./hooks/useWorkout";
import { Workout } from "@/lib/supabase/db/types";

type Props = {
  initialWorkouts: Workout[];
};

export default function Workouts({ initialWorkouts }: Props) {
  const { deleteWorkoutPlan } = useWorkout();
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);

  const onDelete = async (workoutId: number) => {
    await deleteWorkoutPlan(workoutId);
    setWorkouts((prev) => prev.filter((w) => w.workoutId !== workoutId));
  };

  const onWorkoutUpdate = (workout: Workout) => {
    setWorkouts((prev) =>
      prev.map((w) => (w.workoutId === workout.workoutId ? workout : w))
    );
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.workoutId}
          {...workout}
          onDelete={onDelete}
          onWorkoutUpdate={onWorkoutUpdate}
        />
      ))}
      <AddWorkoutCard setWorkouts={setWorkouts} />
    </div>
  );
}
