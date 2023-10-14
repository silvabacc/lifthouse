import { RoutineExercise } from "@backend/types";
import { Card, Divider, Typography } from "antd";
import React from "react";
import { Skeleton } from "antd";
import { useScreen } from "@frontend/hooks/useScreen";
import { useWorkoutContext } from "../WorkoutContext";
import { SetsRepsSteps } from "./SetsRepsSteps";
import History from "./History";

const { Text } = Typography;

export const ExerciseCard: React.FC = () => {
  const { isMobile } = useScreen();

  const ExerciseCardContent = isMobile ? PanelContent : FullContent;

  return <ExerciseCardContent />;
};

const FullContent: React.FC = () => {
  const { workoutData, isLoading } = useWorkoutContext();

  const Title = (exercise: RoutineExercise) => {
    const title = workoutData.exercises.find(
      (e) => e.exerciseId === exercise.exerciseId
    )?.exerciseName;

    return (
      <div
        style={{ display: "flex", alignItems: "center", fontWeight: "normal" }}
      >
        <Text strong>{title}</Text>
        <Divider type="vertical" style={{ height: 30 }} />
        <div>
          <Text keyboard>{exercise.sets}</Text> x{" "}
          <Text keyboard>{exercise.reps}</Text>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading && <SkeletonFullContent />}
      {workoutData.routine.exercises.map((exercise, idx) => {
        return (
          <Card
            style={{ margin: 16 }}
            title={Title(exercise)}
            key={`${exercise.exerciseId}-${idx}`}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <SetsRepsSteps exercise={exercise} />
              <Divider style={{ height: 200 }} type="vertical" />
              <History exerciseId={exercise.exerciseId} />
            </div>
          </Card>
        );
      })}
    </>
  );
};

const PanelContent: React.FC = () => {
  return <></>;
};

export const SkeletonFullContent: React.FC = () => {
  return (
    <>
      {Array.from(Array(12)).map((_, idx) => (
        <div
          key={`skeleton-${idx}`}
          style={{
            borderStyle: "solid",
            borderColor: "#f0f0f0",
            padding: 16,
            margin: 16,
          }}
        >
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      ))}
    </>
  );
};
