import { RoutineType } from "@backend/types";
import React from "react";
import { WorkoutContextProvider } from "./WorkoutContext";
import WorkoutContent from "./WorkoutContent";

const Workout: React.FC = () => {
  return (
    <WorkoutContextProvider>
      <WorkoutContent />
    </WorkoutContextProvider>
  );
};

export default Workout;
