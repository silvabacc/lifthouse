import { Exercise, RoutineExercise } from "@backend/types";
import { Card } from "antd";
import React from "react";
import { useWorkout } from "../../useWorkout";
import { Skeleton } from "antd";
import { useScreen } from "@frontend/hooks/useScreen";

export const ExerciseCard: React.FC = () => {
  const { isMobile } = useScreen();

  const ExerciseCardContent = isMobile ? PanelContent : FullContent;

  return <ExerciseCardContent />;
};

const FullContent: React.FC = () => {
  return <></>;
};

const PanelContent: React.FC = () => {
  return <></>;
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
