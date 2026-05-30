"use client";

import { Exercise, Workout } from "@/lib/supabase/db/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface WorkoutIdContext {
  workout: Workout;
  setWorkout: Dispatch<SetStateAction<Workout>>;
  exercises: Exercise[];
  setExercises: Dispatch<SetStateAction<Exercise[]>>;
}

const WorkoutIdContext = createContext<WorkoutIdContext>(
  {} as WorkoutIdContext
);

export const useWorkoutIdContext = () => useContext(WorkoutIdContext);

type Props = {
  children: React.ReactNode;
  initialWorkout: Workout;
  initialExercises: Exercise[];
};

export const WorkoutIdContextProvider = ({
  children,
  initialWorkout,
  initialExercises,
}: Props) => {
  const [workout, setWorkout] = useState<Workout>(initialWorkout);
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);

  return (
    <WorkoutIdContext.Provider value={{ workout, setWorkout, exercises, setExercises }}>
      {children}
    </WorkoutIdContext.Provider>
  );
};
