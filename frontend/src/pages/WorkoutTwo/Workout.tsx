import { RoutineType } from "@backend/types";
import React from "react";
import { WorkoutContextProvider } from "./WorkoutContext";
import WorkoutContent from "./WorkoutContent";

interface WorkoutProps {
  routineType: RoutineType;
}

const Workout: React.FC<WorkoutProps> = ({ routineType }) => {
  return (
    <WorkoutContextProvider>
      <WorkoutContent routine={routineType} />
    </WorkoutContextProvider>
  );
};

export default Workout;
