import { Exercise, RoutineType } from "@backend/types";
import React, { useEffect, useState } from "react";
import { gridGutter } from "./constants";
import { useWorkoutContext } from "./WorkoutContext";
import { Col, Row } from "antd";
import { RoutineData, useWorkout } from "../Workout/useWorkout";
import ExerciseCard from "./components/ExerciseCard";
import SkeletonExerciseCard from "./components/Skeleton/SkeletonExerciseCard";

interface WorkoutProps {
  routine: RoutineType;
}

const Workout: React.FC<WorkoutProps> = ({ routine }) => {
  const { isEditing, setEditing } = useWorkoutContext();
  const { queryRoutine } = useWorkout();
  const { data, isLoading } = queryRoutine(routine);
  const [routineData, setRoutineData] = useState<RoutineData>({
    routine: {},
    exercises: [] as Exercise[],
  } as RoutineData);

  useEffect(() => {
    if (!isLoading && data) {
      setRoutineData(data);
    }
  }, [isLoading, data]);

  const onEdit = () => {
    setEditing(!isEditing);
  };

  return (
    <>
      {isLoading && <SkeletonExerciseCard />}
      {routineData.exercises.map((exercise) => (
        <ExerciseCard exercise={exercise} />
      ))}
    </>
  );
};

export default Workout;
