"use client";

import { useEffect, useState, useTransition } from "react";
import { App, Button, Divider, Drawer, Input, Space, Typography } from "antd";
import { useWorkoutIdContext } from "../../context";
import { useLocalStorage } from "../../../../../../../hooks/useLocalStorage";
import { LogEntry } from "@/lib/supabase/db/types";
import { useRouter } from "next/navigation";
import { Complete } from "./complete";
import { getLatestLogs, saveLogs } from "../../../../actions";

const { TextArea } = Input;
const { Text } = Typography;

type Props = {
  show: boolean;
  onCancel: () => void;
};

export function Record({ show, onCancel }: Props) {
  const { workout, exercises } = useWorkoutIdContext();
  const { cacheLogInfo, getCachedLogInfo, clearCacheLogInfo } = useLocalStorage();
  const [latestLogs, setLatestLogs] = useState<LogEntry[]>();
  const [isPending, startTransition] = useTransition();
  const { message } = App.useApp();
  const router = useRouter();

  const onChangeNotes = (value: string, exerciseId: number) => {
    cacheLogInfo(exerciseId, { notes: value });
  };

  useEffect(() => {
    if (!show) return;
    const ids = workout.exercises.map((e) => e.exerciseId);
    getLatestLogs(ids).then(setLatestLogs);
  }, [show, workout.exercises]);

  const onFinish = () => {
    const logs = workout.exercises
      .map((exercise) => {
        const cached = getCachedLogInfo(exercise.exerciseId);
        return {
          exerciseId: exercise.exerciseId,
          info: cached?.info,
          notes: cached?.notes,
          date: new Date(),
        };
      })
      .filter((log) => log.info) as LogEntry[];

    startTransition(async () => {
      await saveLogs(logs);
      clearCacheLogInfo(workout.exercises.map((e) => e.exerciseId));
      message.success("Saved!");
      router.push("/lifthouse/workouts");
    });
  };

  return (
    <Drawer
      styles={{ wrapper: { width: 350 } }}
      open={show}
      onClose={onCancel}
      footer={
        <Button onClick={onFinish} loading={isPending} className="w-full my-2">
          {isPending ? "Saving" : "Finish workout!"}
        </Button>
      }
    >
      <Space orientation="vertical" className="w-full">
        {workout.exercises.map((exercise, index) => {
          const notes = getCachedLogInfo(exercise.exerciseId)?.notes;
          const exerciseInfo = exercises.find((e) => e.exerciseId === exercise.exerciseId);

          return (
            <div key={`${exercise.exerciseId}-${index}`}>
              <div className="flex flex-wrap justify-between">
                <Space className="flex-wrap">
                  <h1 className="text-base font-medium">{exerciseInfo?.name}</h1>
                  <Text className="text-sm" keyboard>
                    {exercise.sets} x {exercise.reps}
                  </Text>
                </Space>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap">
                <div>
                  <TextArea
                    autoSize
                    defaultValue={notes}
                    placeholder={
                      latestLogs?.find((l) => l.exerciseId === exercise.exerciseId)?.notes ||
                      "Notes"
                    }
                    className="mt-4"
                    onChange={(e) => onChangeNotes(e.target.value, exercise.exerciseId)}
                  />
                  <Complete
                    exercise={exercise}
                    latestLogInfo={
                      latestLogs?.find((l) => l.exerciseId === exercise.exerciseId)?.info
                    }
                  />
                </div>
              </div>
              <Divider className="m-4" />
            </div>
          );
        })}
      </Space>
    </Drawer>
  );
}
