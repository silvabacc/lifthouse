import { LogInfo, ExerciseConfiguration } from "@/lib/supabase/db/types";
import { Button, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Props = {
  exercise: ExerciseConfiguration;
  latestLogInfo?: LogInfo[];
};

/**
 * The set-by-set logger. One row per set: the active row takes input, completed
 * rows show a green check and can be tapped to re-open for edits, and future
 * rows stay locked until the previous set is confirmed.
 */
export function Complete({ exercise, latestLogInfo }: Props) {
  const { getCachedLogInfo } = useLocalStorage();
  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    const highestSet = getCachedLogInfo(exercise.exerciseId)?.info.reduce(
      (acc, curr) => (curr.set > acc ? curr.set : acc),
      0,
    );
    setCurrentSet(highestSet || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.exerciseId]);

  const rows = [];
  for (let i = 0; i < exercise.sets; i++) {
    const latestLog = latestLogInfo?.find((l) => l.set === i + 1);

    rows.push(
      <SetRow
        key={i}
        exerciseId={exercise.exerciseId}
        step={i}
        placeHolder={{
          reps: latestLog?.reps.toString(),
          weight: latestLog?.weight.toString(),
        }}
        state={
          i === currentSet ? "active" : i < currentSet ? "completed" : "locked"
        }
        onReopen={() => setCurrentSet(i)}
        onContinue={() => setCurrentSet(currentSet + 1)}
      />,
    );
  }

  return <div className="mt-3 flex flex-col gap-2">{rows}</div>;
}

type SetRowProps = {
  exerciseId: number;
  step: number;
  state: "active" | "completed" | "locked";
  placeHolder?: { reps?: string; weight?: string };
  onReopen: () => void;
  onContinue: () => void;
};

function SetRow({
  exerciseId,
  step,
  state,
  placeHolder,
  onReopen,
  onContinue,
}: SetRowProps) {
  const [weight, setWeight] = useState<number>();
  const [reps, setReps] = useState<number>();
  const { getCachedLogInfo, cacheLogInfo } = useLocalStorage();
  const [noRepsWarning, setNoRepsWarning] = useState(false);

  useEffect(() => {
    const cachedInfo = getCachedLogInfo(exerciseId)?.info.find(
      (i) => i.set === step + 1,
    );
    setWeight(cachedInfo?.weight);
    setReps(cachedInfo?.reps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId, step]);

  const onConfirm = () => {
    if (!reps) {
      setNoRepsWarning(true);
      return;
    }

    setNoRepsWarning(false);
    // +1 for the set
    cacheLogInfo(exerciseId, {
      info: {
        set: step + 1,
        reps: reps || 0,
        weight: weight || 0,
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
        <InputNumber
          disabled={disabled}
          inputMode="decimal"
          placeholder={placeHolder?.weight}
          value={weight}
          onChange={(w) => setWeight(w ?? 0)}
          min={0}
          suffix="kg"
          className="w-full"
        />
        <InputNumber
          disabled={disabled}
          inputMode="decimal"
          value={reps}
          placeholder={placeHolder?.reps}
          min={0}
          onChange={(r) => setReps(r ?? 0)}
          suffix="reps"
          className="w-full"
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
      {placeHolder?.weight && state === "active" && (
        <p className="m-0 mt-1 pl-11 text-xs text-gray-400">
          Last time: {placeHolder.weight}kg × {placeHolder.reps}
        </p>
      )}
    </div>
  );
}
