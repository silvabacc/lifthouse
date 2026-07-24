"use client";

import { useEffect, useState, useTransition } from "react";
import { App, Button, Drawer, Input } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useWorkoutIdContext } from "../../context";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LogEntry } from "@/lib/supabase/db/types";
import { useRouter } from "next/navigation";
import { Complete } from "./complete";
import { SetRepPill } from "@/app/lifthouse/components/setRepPill";
import { getLatestLogs, saveLogs } from "../../../../actions";

const { TextArea } = Input;

type Props = {
  show: boolean;
  onCancel: () => void;
};

export function Record({ show, onCancel }: Props) {
  const { workout, exercises } = useWorkoutIdContext();
  const { cacheLogInfo, getCachedLogInfo, clearCacheLogInfo } =
    useLocalStorage();
  const [latestLogs, setLatestLogs] = useState<LogEntry[]>();
  const [cachedNotes, setCachedNotes] = useState<
    Record<number, string | undefined>
  >({});
  const [isPending, startTransition] = useTransition();
  const { message } = App.useApp();
  const router = useRouter();

  const onChangeNotes = (value: string, exerciseId: number) => {
    cacheLogInfo(exerciseId, { notes: value });
    setCachedNotes((prev) => ({ ...prev, [exerciseId]: value }));
  };

  useEffect(() => {
    if (!show) return;
    const ids = workout.exercises.map((e) => e.exerciseId);
    getLatestLogs(ids).then(setLatestLogs);

    const notes: Record<number, string | undefined> = {};
    workout.exercises.forEach((exercise) => {
      notes[exercise.exerciseId] = getCachedLogInfo(exercise.exerciseId)?.notes;
    });
    setCachedNotes(notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      message.success("Workout saved 💪");
      router.push("/lifthouse/workouts");
    });
  };

  return (
    <Drawer
      title={
        <div>
          <div className="text-base font-semibold">Record workout</div>
          <div className="text-xs font-normal text-gray-500">
            {workout.name} · {workout.exercises.length} exercise
            {workout.exercises.length === 1 ? "" : "s"}
          </div>
        </div>
      }
      size="min(440px, 100vw)"
      open={show}
      onClose={onCancel}
      footer={
        <Button
          type="primary"
          size="large"
          block
          icon={<CheckOutlined />}
          onClick={onFinish}
          loading={isPending}
          className="my-1"
        >
          {isPending ? "Saving" : "Finish workout"}
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        {workout.exercises.map((exercise, index) => {
          const notes = cachedNotes[exercise.exerciseId];
          const latest = latestLogs?.find(
            (l) => l.exerciseId === exercise.exerciseId,
          );
          const exerciseInfo = exercises.find(
            (e) => e.exerciseId === exercise.exerciseId,
          );

          return (
            <section
              key={`${exercise.exerciseId}-${index}`}
              className="rounded-xl border border-solid border-gray-100 p-3"
            >
              <div className="flex flex-wrap items-center gap-2 pb-1">
                <h3 className="m-0 text-base font-semibold">
                  {exerciseInfo?.name}
                </h3>
                <SetRepPill sets={exercise.sets} reps={exercise.reps} />
              </div>
              <Complete exercise={exercise} latestLogInfo={latest?.info} />
              <TextArea
                autoSize
                value={notes}
                placeholder={latest?.notes || "Notes (optional)"}
                className="mt-3"
                onChange={(e) =>
                  onChangeNotes(e.target.value, exercise.exerciseId)
                }
              />
            </section>
          );
        })}
      </div>
    </Drawer>
  );
}
