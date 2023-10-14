import { Exercise, RoutineType } from "@backend/types";
import React, { useEffect, useState } from "react";
import { gridGutter } from "./constants";
import { useWorkoutContext } from "./WorkoutContext";
import { Button, Col, Row } from "antd";
import { RoutineData, useWorkout } from "../Workout/useWorkout";
import {
  ExerciseCard,
  SkeletonExerciseCard,
} from "./components/ExerciseCard/ExerciseCard";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

interface WorkoutContentProps {
  routine: RoutineType;
}

const WorkoutContent: React.FC<WorkoutContentProps> = ({ routine }) => {
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
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button
          style={{ marginLeft: "auto", marginRight: 0 }}
          onClick={onEdit}
          icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      {isLoading && <SkeletonExerciseCard />}
      {routineData.exercises.map((exercise) => (
        <ExerciseCard key={exercise.exerciseId} exercise={exercise} />
      ))}
    </>
  );
};

export default WorkoutContent;
