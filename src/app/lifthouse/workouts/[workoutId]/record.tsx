"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Drawer,
  Input,
  Modal,
  Space,
  Tabs,
  TabsProps,
  message,
} from "antd";
import { SelectExercise, SelectRepsScheme } from "./components/selectors";
import { useWorkoutIdContext } from "./context";
import { Start } from "./components/start";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useFetch } from "@/app/hooks/useFetch";
import { LogEntry, WorkoutTemplate } from "@/lib/supabase/db/types";
import { useRouter } from "next/navigation";
import DeleteExerciseButton from "./components/deleteExerciseButton";

const { TextArea } = Input;

const COMPACT_SCREEN = 300;

type Props = {
  show: boolean;
  onCancel: () => void;
};
export function Record({ show, onCancel }: Props) {
  const { workout, exercises } = useWorkoutIdContext();
  const { cacheLogInfo, getCachedLogInfo, clearCacheLogInfo } =
    useLocalStorage();
  const { fetch } = useFetch();
  const [latestLogs, setLatestLogs] = useState<LogEntry[]>();
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < COMPACT_SCREEN);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const onFinish = async () => {
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
      .filter((log) => log.info);

    setSaving(true);

    await fetch("/api/logs/create", {
      method: "POST",
      body: JSON.stringify(logs),
    });

    setSaving(false);
    clearCacheLogInfo(workout.exercises.map((e) => e.exerciseId));
    router.push("/lifthouse/workouts");
    messageApi.success("Saved!");
  };

  return (
    <Drawer
      width={isSmallScreen ? "100%" : 330}
      open={show}
      onClose={onCancel}
      footer={
        <Button onClick={onFinish} disabled={saving} className="w-full my-2">
          {saving ? "Saving" : "Finish workout!"}
        </Button>
      }
    >
      <Space direction="vertical" className="w-full">
        {contextHolder}
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
                {workout.template === WorkoutTemplate.custom && (
                  <DeleteExerciseButton exerciseId={exercise.exerciseId} />
                )}
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
              </div>
              <Divider className="m-4" />
            </div>
          );
        })}
      </Space>
    </Drawer>
  );
}
