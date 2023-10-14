import { Exercise } from "@backend/types";
import { Card } from "antd";
import React from "react";
import { useWorkout } from "../../useWorkout";
import { Skeleton } from "antd";
import { useScreen } from "@frontend/hooks/useScreen";
import ExerciseContentFull from "./ExerciseContentFull";
import ExerciseContentPanel from "./ExerciseContentPanel";

interface ExerciseCardProps {
  exercise: Exercise;
}
export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const { isMobile } = useScreen();

  const CardTitle = (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {exercise.exerciseName}
    </div>
  );

  const ExerciseCardContent = isMobile
    ? ExerciseContentPanel
    : ExerciseContentFull;

  return (
    <Card style={{ margin: 16 }} title={CardTitle}>
      <ExerciseCardContent />
    </Card>
  );
};

export const SkeletonExerciseCard: React.FC = () => {
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
          <Skeleton active />
        </div>
      ))}
    </>
  );
};
