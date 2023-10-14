import { RoutineExercise, Exercise, RoutineType } from "@backend/types";
import { createContext, useContext, useEffect, useState } from "react";
import { WorkoutData, useWorkout } from "../Workout/useWorkout";
import { useLocation, useSearchParams } from "react-router-dom";

interface WorkoutcontextType {
  isEditing: boolean;
  setEditing: (isEditing: boolean) => void;
  workoutData: WorkoutData;
  setWorkoutData: (workoutData: WorkoutData) => void;
  isLoading: boolean;
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
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContextProvider, useWorkoutContext };
