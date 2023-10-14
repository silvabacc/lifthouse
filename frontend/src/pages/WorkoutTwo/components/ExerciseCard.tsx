import { Exercise } from "@backend/types";
import { Card } from "antd";
import React from "react";
import { useWorkout } from "../useWorkout";
import SetsReps from "./ExerciseSteps/SetsReps";

interface ExerciseCardProps {
  exercise: Exercise;
}
const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const { getExerciseHistory } = useWorkout();
  const { data } = getExerciseHistory(exercise.exerciseId, 1);

  return (
    <Card style={{ margin: 16 }} title={exercise.exerciseName}>
      <div style={{ display: "flex" }}></div>
    </Card>
  );
};

export default ExerciseCard;
