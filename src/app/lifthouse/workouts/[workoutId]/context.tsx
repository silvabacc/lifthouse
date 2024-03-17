"use client";

import { useFetch } from "@/app/hooks/useFetch";
import { Exercise, Workout } from "@/lib/supabase/db/types";
import { useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import WorkoutIdSkeleton from "./workoutId.skeleton";

interface WorkoutIdContext {
  workout: Workout;
  setWorkout: Dispatch<SetStateAction<Workout | undefined>>;
  exercises: Exercise[];
  setExercises: Dispatch<SetStateAction<Exercise[]>>;
}

const WorkoutIdContext = createContext<WorkoutIdContext>(
  {} as WorkoutIdContext
);

export const useWorkoutIdContext = () => useContext(WorkoutIdContext);

export const WorkoutIdContextProvider = ({ children, workoutId }: any) => {
  const [workout, setWorkout] = useState<Workout | undefined>();
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const { fetch } = useFetch();

  useEffect(() => {
    const fetchWorkoutData = async () => {
      const response: Workout = await fetch(`/api/workouts/${workoutId}`);
      setWorkout(response);
    };

    const fetchExercises = async () => {
      const exercisesResponse: Exercise[] = await fetch("/api/exercises");
      setExercises(exercisesResponse);
    };

    fetchExercises();
    fetchWorkoutData();
  }, []);

  if (!workout || exercises.length === 0) {
    return <WorkoutIdSkeleton />;
  }

  return (
    <WorkoutIdContext.Provider
      value={{ workout, setWorkout, exercises, setExercises }}
    >
      {children}
    </WorkoutIdContext.Provider>
  );
};
