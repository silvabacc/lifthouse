import { useEffect, useState } from "react";
import { useWorkout } from "../hooks/useWorkout";
import { Exercise, Workout } from "@/lib/supabase/db/types";
import { Collapse, CollapseProps, Space } from "antd";

type RecordProps = {
  workout: Workout;
  exercises: Exercise[];
};

export function Record({ workout, exercises }: RecordProps) {
  const items: CollapseProps["items"] = workout.exercises.map((exercise) => {
    const exerciseName = exercises.find(
      (e) => e.exerciseId === exercise.exerciseId
    )?.name;

    return {
      key: exercise.exerciseId,
      label: (
        <Space direction="vertical">
          <h1>{exerciseName}</h1>
          <p>
            {exercise.sets}x{exercise.reps}
          </p>
        </Space>
      ),
      children: <div>Content</div>,
    };
  });
  return (
    <div className="pr-4 pb-4">
      <Collapse items={items} />
    </div>
  );
}
