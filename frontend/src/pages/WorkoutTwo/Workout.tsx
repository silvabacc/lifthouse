import { RoutineType } from "@backend/types";
import { Button } from "antd";
import React from "react";
import Header from "../common/Header";
import { pageTitleMapping } from "./constants";
import { useWorkoutContext } from "./WorkoutContext";

interface WorkoutProps {
  routine: RoutineType;
}

const Workout: React.FC<WorkoutProps> = ({ routine }) => {
  const { isEditing, setEditing } = useWorkoutContext();

  const onEdit = () => {
    setEditing(!isEditing);
  };

  return <div></div>;
};

export default Workout;
