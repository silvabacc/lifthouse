import { Exercise, RoutineExercise, RoutineType } from "@backend/types";
import React, { useEffect, useState } from "react";
import { gridGutter } from "./constants";
import { useWorkoutContext } from "./WorkoutContext";
import { Button, Col, Row } from "antd";
import { WorkoutData, useWorkout } from "../Workout/useWorkout";
import {
  ExerciseCard,
  SkeletonExerciseCard,
} from "./components/ExerciseCard/ExerciseCard";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

const WorkoutContent: React.FC = () => {
  const { isEditing, setEditing, workoutData, isLoading } = useWorkoutContext();

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
      <ExerciseCard />
    </>
  );
};

export default WorkoutContent;
