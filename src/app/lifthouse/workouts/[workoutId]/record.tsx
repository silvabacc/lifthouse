"use client";

import { useEffect, useState } from "react";
import { Button, Input, Space, Tabs, TabsProps } from "antd";
import { SelectExercise, SelectRepsScheme } from "./components/selectors";
import { useWorkoutIdContext } from "./context";
import { Start } from "./components/start";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

const { TextArea } = Input;

export function Record() {
  const { workout } = useWorkoutIdContext();
  const { cacheLogInfo, getCachedLogInfo } = useLocalStorage();

  const onChangeNoes = (value: string, exerciseId: number) => {
    cacheLogInfo(exerciseId, { notes: value });
  };

  return (
    <Space direction="vertical" className="w-full">
      {workout.exercises.map((exercise, index) => {
        const notes = getCachedLogInfo(exercise.exerciseId)?.notes;

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
              defaultValue={notes}
              placeholder="Notes"
              className="mt-4"
              onChange={(e) =>
                onChangeNoes(e.target.value, exercise.exerciseId)
              }
            />
            <Start exercise={exercise} />
            <Button>Finish</Button>
          </div>
        );
      })}
    </Space>
  );
}
