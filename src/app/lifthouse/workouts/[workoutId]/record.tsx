"use client";

import { useEffect, useState } from "react";
import { Button, Divider, Input, Space, Tabs, TabsProps } from "antd";
import { SelectExercise, SelectRepsScheme } from "./components/selectors";
import { useWorkoutIdContext } from "./context";
import { Start } from "./components/start";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useFetch } from "@/app/hooks/useFetch";
import { LogEntry } from "@/lib/supabase/db/types";

const { TextArea } = Input;

export function Record() {
  const { workout, exercises } = useWorkoutIdContext();
  const { cacheLogInfo, getCachedLogInfo } = useLocalStorage();
  const { fetch } = useFetch();
  const [showVideo, setShowVideo] = useState(false);
  const [latestLogs, setLatestLogs] = useState<LogEntry[]>();

  const onChangeNoes = (value: string, exerciseId: number) => {
    cacheLogInfo(exerciseId, { notes: value });
  };

  const fetchLatestLog = async () => {
    const response: LogEntry[] = await fetch("/api/logs/latest", {
      method: "POST",
      body: JSON.stringify({
        exerciseIds: workout.exercises.map((e) => e.exerciseId),
      }),
    });
    setLatestLogs(response);
  };

  useEffect(() => {
    fetchLatestLog();
  }, [workout.exercises]);

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
            <div className="flex flex-wrap sm:flex-nowrap">
              <div>
                <TextArea
                  autoSize={true}
                  defaultValue={notes}
                  placeholder={
                    latestLogs?.find(
                      (l) => l.exerciseId === exercise.exerciseId
                    )?.notes || "Notes"
                  }
                  className="mt-4"
                  onChange={(e) =>
                    onChangeNoes(e.target.value, exercise.exerciseId)
                  }
                />
                <Start
                  exercise={exercise}
                  latestLogInfo={
                    latestLogs?.find(
                      (l) => l.exerciseId === exercise.exerciseId
                    )?.info
                  }
                />
              </div>
              <Divider
                type="vertical"
                className="hidden sm:block h-96 mt-4 ml-4"
              />
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
