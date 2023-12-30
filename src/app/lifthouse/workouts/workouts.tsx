"use client";

import AddWorkoutCard from "./components/addWorkoutCard";
import WorkoutCard from "./components/workoutCard";
import { useWorkout } from "./useWorkout";

export default function Workouts() {
  const { isLoading, workouts } = useWorkout();

  if (isLoading) {
    return <>Workouts Skeleton Placeholder</>;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {workouts?.map((workout) => {
        return <WorkoutCard key={workout.workoutId} {...workout} />;
      })}
      <AddWorkoutCard />
    </div>
  );
}
