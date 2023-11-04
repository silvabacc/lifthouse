import { RoutineExercise, Exercise, RoutineType } from "@backend/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { WorkoutData, useWorkout } from "./useWorkout";

interface WorkoutcontextType {
  isEditing: boolean;
  setEditing: (isEditing: boolean) => void;
  workoutData: WorkoutData;
  setWorkoutData: (workoutData: WorkoutData) => void;
  isLoading: boolean;
  routineType?: RoutineType;
  exercisesFinished: string[];
  setExercisesFinished: React.Dispatch<React.SetStateAction<string[]>>;
}

const WorkoutContext = createContext<WorkoutcontextType>({} as any);

const useWorkoutContext = () => useContext(WorkoutContext);

const WorkoutContextProvider = ({ children }: any) => {
  const [isEditing, setEditing] = useState(false);
  const [workoutData, setWorkoutData] = useState<WorkoutData>({
    routine: { exercises: [] as RoutineExercise[] },
    exercises: [] as Exercise[],
  } as WorkoutData);
  const { pathname } = useLocation();
  const [routineType, setRoutinetype] = useState<RoutineType>();
  const [exercisesFinished, setExercisesFinished] = useState<string[]>([]);

  useEffect(() => {
    const routineType = pathname.split("/")[2];
    setRoutinetype(routineType as RoutineType);
  }, [pathname]);

  const { queryRoutine } = useWorkout();
  const { data, isLoading } = queryRoutine(routineType);

  useEffect(() => {
    if (!isLoading && data) {
      setWorkoutData(data);
    }
  }, [isLoading, data]);

  return (
    <WorkoutContext.Provider
      value={{
        isEditing,
        setEditing,
        workoutData,
        setWorkoutData,
        isLoading: isLoading,
        routineType: routineType,
        exercisesFinished,
        setExercisesFinished,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContextProvider, useWorkoutContext };
