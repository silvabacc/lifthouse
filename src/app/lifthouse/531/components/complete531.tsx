import React from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LogEntry, PersonalBest } from "@/lib/supabase/db/types";
import { CheckOutlined } from "@ant-design/icons";
import {
  Alert,
  App,
  Button,
  Collapse,
  Drawer,
  Input,
  InputNumber,
} from "antd";
import { useEffect, useState, useTransition } from "react";
import { useFiveThreeOneContext } from "../context";
import Warmup from "./warmup";
import { useFiveThreeOne } from "../useFiveThreeOne";
import { NotificationDescription, NotificationMessage } from "./notification";
import { LogVisual } from "../../components/logVisuals/logVisual";
import { saveLogs } from "../../actions";

const { TextArea } = Input;

type Props = {
  open: boolean;
  onClose: () => void;
  selectedExercise: PersonalBest;
  sets: number;
  reps: number[];
  intensity: number[];
  latestLog?: LogEntry;
};

export default function CompleteFiveThreeOneModal({
  open,
  onClose,
  selectedExercise,
  sets,
  reps,
  intensity,
  latestLog,
}: Props) {
  const {
    getCachedLogInfo,
    clearCacheLogInfo,
    cacheFiveThreeOneInfo,
    getCachedFiveThreeOneInfo,
    cacheLogInfo,
    clearFiveThreeOne,
  } = useLocalStorage();
  const { increasePersonalBests } = useFiveThreeOne();
  const [currentSet, setCurrentSet] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { setWeek, setCompleted, fiveThreeOneInfo } = useFiveThreeOneContext();
  const [notes, setNotes] = useState<string>();
  const { notification: api } = App.useApp();
  const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;

  const exercises = [bench, squat, deadlift, ohp];

  useEffect(() => {
    const highestSet =
      getCachedLogInfo(selectedExercise.exercise.exerciseId)?.info.reduce(
        (acc, curr) => (curr.set > acc ? curr.set : acc),
        0,
      ) || 0;

    setCurrentSet(highestSet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExercise]);

  const onChangeNotes = (value: string) => {
    cacheLogInfo(selectedExercise.exercise.exerciseId, {
      notes: value,
    });
    setNotes(value);
  };

  const onOk = () => {
    const info = getCachedLogInfo(selectedExercise.exercise.exerciseId)?.info;
    const cachedFiveThreeOneInfo = getCachedFiveThreeOneInfo();

    if (info?.length !== sets) {
      setShowWarning(true);
      return;
    }

    const { exercise } = selectedExercise;
    const cached = getCachedLogInfo(exercise.exerciseId);
    const log = {
      exerciseId: exercise.exerciseId,
      info: cached?.info,
      notes: cached?.notes,
      date: new Date(),
    };

    startTransition(async () => {
      await saveLogs([log as any]);

      if (cachedFiveThreeOneInfo?.completed.length === 3) {
        cacheFiveThreeOneInfo({
          week: cachedFiveThreeOneInfo.week + 1,
          completed: [],
        });
        if (cachedFiveThreeOneInfo.week === 4) {
          clearFiveThreeOne();
          setWeek(1);
          await increasePersonalBests();
          api.info({
            title: <NotificationMessage />,
            description: <NotificationDescription exercises={exercises} />,
          });
        } else {
          setWeek(cachedFiveThreeOneInfo.week + 1);
        }
        setCompleted([]);
      } else {
        const newCompleted = [
          ...(cachedFiveThreeOneInfo?.completed || []),
          exercise.exerciseId,
        ];
        cacheFiveThreeOneInfo({
          week: cachedFiveThreeOneInfo?.week || 1,
          completed: newCompleted,
        });
        setWeek(cachedFiveThreeOneInfo?.week || 1);
        setCompleted(newCompleted);
      }

      clearCacheLogInfo([exercise.exerciseId]);
      setShowWarning(false);
      setNotes("");
      onClose();
    });
  };

  const latestReps = latestLog?.info?.at(-1)?.reps || 0;
  // Compare against this week's last-set target (Week 1=5, Week 2=3, Week 3=1, Week 4=5)
  const lastSetTarget = reps[reps.length - 1];
  const improvement = latestReps - lastSetTarget;

  return (
    <Drawer
      width="min(480px, 100vw)"
      title={
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-base font-semibold">
            {selectedExercise.exercise.name}
          </span>
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
            {reps.join(" / ")} reps
          </span>
        </div>
      }
      open={open}
      onClose={() => {
        setShowWarning(false);
        onClose();
      }}
      footer={
        <Button
          type="primary"
          size="large"
          block
          icon={<CheckOutlined />}
          onClick={onOk}
          loading={isPending}
          className="my-1"
        >
          {isPending ? "Saving" : "Finish"}
        </Button>
      }
    >
      <div className="flex flex-col gap-2">
        {Array.from({ length: sets }).map((_, i) => (
          <Row
            key={i}
            info={selectedExercise}
            step={i}
            target={reps[i]}
            intensity={intensity[i]}
            state={
              i === currentSet ? "active" : i < currentSet ? "completed" : "locked"
            }
            onReopen={() => setCurrentSet(i)}
            onContinue={() => setCurrentSet(currentSet + 1)}
          />
        ))}
        {latestLog && (
          <Alert
            className="mt-2"
            showIcon
            type="info"
            title={
              <div>
                Last time your final set was{" "}
                <span className="font-bold">
                  {latestLog.info?.at(-1)?.weight} kg × {latestReps}
                </span>{" "}
                ({improvement <= 0 ? "" : "+"}
                {improvement} vs target)
              </div>
            }
          />
        )}
        <TextArea
          autoSize
          value={notes}
          placeholder={latestLog?.notes || "Notes (optional)"}
          className="my-2"
          onChange={(e) => onChangeNotes(e.target.value)}
        />
        {showWarning && (
          <Alert
            className="mb-2"
            showIcon
            type="error"
            title="Confirm the reps for every set before finishing"
          />
        )}
        <Collapse
          items={[
            {
              key: "warmup",
              label: "Warmup",
              children: <Warmup selectedExercise={selectedExercise} />,
            },
          ]}
        />
        <div className="mt-4">
          <LogVisual exercise={selectedExercise.exercise} />
        </div>
      </div>
    </Drawer>
  );
}

type RowProps = {
  info: PersonalBest;
  step: number;
  target: number;
  intensity: number;
  state: "active" | "completed" | "locked";
  onReopen: () => void;
  onContinue: () => void;
};

function Row({
  info,
  step,
  target,
  intensity,
  state,
  onReopen,
  onContinue,
}: RowProps) {
  const [reps, setReps] = useState<number>();
  const { getCachedLogInfo, cacheLogInfo } = useLocalStorage();
  const [noRepsWarning, setNoRepsWarning] = useState(false);

  useEffect(() => {
    const cachedInfo = getCachedLogInfo(info.exercise.exerciseId)?.info.find(
      (i) => i.set === step + 1,
    );
    setReps(cachedInfo?.reps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const weight = (intensity * 0.9 * info.pb).toFixed(0);

  const onConfirm = () => {
    if (!reps) {
      setNoRepsWarning(true);
      return;
    }

    setNoRepsWarning(false);
    // +1 for the set
    cacheLogInfo(info.exercise.exerciseId, {
      info: {
        set: step + 1,
        reps: reps || 0,
        weight: parseInt(weight) || 0,
      },
    });
    onContinue();
  };

  const disabled = state !== "active";
  const showWarning = noRepsWarning || (state === "completed" && !reps);

  return (
    <div>
      <div
        className={`flex items-center gap-2 rounded-lg p-2 transition-colors ${
          state === "active"
            ? "bg-indigo-50/60"
            : state === "completed"
              ? "cursor-pointer hover:bg-gray-50"
              : "opacity-50"
        }`}
        onClick={state === "completed" ? onReopen : undefined}
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
            state === "completed"
              ? "bg-green-100 text-green-600"
              : state === "active"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-400"
          }`}
        >
          {state === "completed" ? <CheckOutlined /> : step + 1}
        </span>
        <span className="w-20 shrink-0 text-sm font-semibold text-gray-900">
          {weight} kg
        </span>
        <span className="w-16 shrink-0 text-xs text-gray-400">
          {target}+ reps
        </span>
        <InputNumber
          className="w-full"
          disabled={disabled}
          inputMode="decimal"
          value={reps}
          min={0}
          onChange={(r) => setReps(r ?? 0)}
          suffix="reps"
        />
        <Button
          type={state === "active" ? "primary" : "text"}
          shape="circle"
          disabled={disabled}
          icon={<CheckOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onConfirm();
          }}
          aria-label={`Confirm set ${step + 1}`}
        />
      </div>
      {showWarning && (
        <p className="m-0 mt-1 pl-11 text-xs text-amber-600">
          {state === "active"
            ? "Enter your reps to confirm this set"
            : "This set has no reps recorded"}
        </p>
      )}
    </div>
  );
}
