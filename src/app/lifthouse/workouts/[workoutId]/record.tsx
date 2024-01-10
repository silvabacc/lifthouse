"use client";

import { useEffect, useState } from "react";
import { Input, Space, Tabs, TabsProps } from "antd";
import { SelectExercise, SelectRepsScheme } from "./components/selectors";
import { useWorkoutIdContext } from "./context";
import { Start } from "./components/start";

const { TextArea } = Input;

export function Record() {
  const { workout } = useWorkoutIdContext();
  const [workoutNote, setWorkoutNote] = useState("");

  return (
    <Space direction="vertical" className="w-full">
      {workout.exercises.map((exercise, index) => {
        return (
          <div key={`${exercise.exerciseId}-${index}`}>
            <div className="flex flex-wrap justify-between">
              <Space className="flex-wrap">
                <SelectExercise defaultExercise={exercise} />
                <SelectRepsScheme defaultExercise={exercise} />
              </Space>
            </div>
            <TextArea
              autoSize={true}
              placeholder="Notes"
              className="mt-4"
              onChange={(e) => setWorkoutNote(e.target.value)}
            />
            <Start exercise={exercise} />
          </div>
        );
      })}
    </Space>
  );
}
