"use client";

import { useEffect, useState } from "react";
import { Button, Divider, Input, Space, Tabs, TabsProps } from "antd";
import { SelectExercise, SelectRepsScheme } from "./components/selectors";
import { useWorkoutIdContext } from "./context";
import { Start } from "./components/start";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

const { TextArea } = Input;

export function Record() {
  const { workout, exercises } = useWorkoutIdContext();
  const { cacheLogInfo, getCachedLogInfo } = useLocalStorage();
  const [showVideo, setShowVideo] = useState(false);

  const onChangeNoes = (value: string, exerciseId: number) => {
    cacheLogInfo(exerciseId, { notes: value });
  };

  return (
    <Space direction="vertical" className="w-full">
      {workout.exercises.map((exercise, index) => {
        const notes = getCachedLogInfo(exercise.exerciseId)?.notes;
        const exerciseVideo = exercises.find(
          (e) => e.exerciseId === exercise.exerciseId
        )?.youtubeId;

        return (
          <div key={`${exercise.exerciseId}-${index} w-full`}>
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
            <Divider />
            <div className="flex flex-wrap sm:flex-nowrap">
              <Start exercise={exercise} />
              <Divider type="vertical" className="hidden sm:block h-96" />
              <iframe
                className={`
                  ${
                    showVideo ? "block" : "hidden"
                  } sm:block rounded w-full h-96 m-4`}
                src={`https://www.youtube.com/embed/${exerciseVideo}`}
              />
            </div>
            <div className="block sm:hidden">
              <Divider className="m-4" />
              <Button onClick={() => setShowVideo(!showVideo)} type="link">
                {showVideo ? "Close video demo" : "Video demo"}
              </Button>
            </div>
            <Divider className="m-4" />
          </div>
        );
      })}
      <Button className="w-full my-2">Finish workout!</Button>
    </Space>
  );
}
