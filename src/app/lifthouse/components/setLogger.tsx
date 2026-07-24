"use client";

import { LogInfo, Exercise } from "@/lib/supabase/db/types";
import { Button, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const { TextArea } = Input;

type SetInput = { reps?: number; weight?: number };

type Props = {
  exercise: Exercise;
};

const DEFAULT_INFO: LogInfo[] = [{ set: 1, reps: 0, weight: 0 }];

const toInputs = (info: LogInfo[]): SetInput[] =>
  info.map((i) => ({
    reps: i.reps > 0 ? i.reps : undefined,
    weight: i.weight > 0 ? i.weight : undefined,
  }));

/**
 * Ad-hoc set logger used for standalone entries (exercises page). Unlike the
 * workout-flow logger, the number of sets is dynamic — sets can be added and
 * removed. Shares the same visual language: numbered state badges, full-width
 * inputs, circular confirm.
 */
export function SetLogger({ exercise }: Props) {
  const { getCachedLogInfo, cacheLogInfo, clearCacheLogInfo } =
    useLocalStorage();
  const [cachedNotes, setCachedNotes] = useState<string>();

  const [info, setInfo] = useState<LogInfo[]>(DEFAULT_INFO);
  const [inputs, setInputs] = useState<SetInput[]>(() => toInputs(DEFAULT_INFO));
  const completedSets = info.filter((i) => i.reps > 0 || i.weight > 0).length;
  const [currentSet, setCurrentSet] = useState(completedSets);

  useEffect(() => {
    const cachedLogInfo = getCachedLogInfo(exercise.exerciseId);
    const initialInfo = cachedLogInfo?.info ?? DEFAULT_INFO;
    setInfo(initialInfo);
    setInputs(toInputs(initialInfo));
    setCurrentSet(initialInfo.filter((i) => i.reps > 0 || i.weight > 0).length);
    setCachedNotes(cachedLogInfo?.notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.exerciseId]);

  const onInputChange = (
    index: number,
    field: "reps" | "weight",
    value: number
  ) => {
    setInputs((prev) =>
      prev.map((inp, i) => (i === index ? { ...inp, [field]: value } : inp))
    );
  };

  const onConfirm = (index: number) => {
    const { reps } = inputs[index] ?? {};
    if (!reps) return false;

    const set = index + 1;
    cacheLogInfo(exercise.exerciseId, {
      info: { set, reps: reps ?? 0, weight: inputs[index]?.weight ?? 0 },
    });
    setCurrentSet(currentSet + 1);
    return true;
  };

  const onDelete = (index: number) => {
    const newInfo = info
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, set: i + 1 }));
    const newInputs = inputs.filter((_, i) => i !== index);

    setInfo(newInfo);
    setInputs(newInputs);
    if (currentSet > index) setCurrentSet((s) => s - 1);

    clearCacheLogInfo([exercise.exerciseId]);
    newInfo.forEach((item, i) => {
      const inp = newInputs[i];
      if (inp?.reps || inp?.weight) {
        cacheLogInfo(exercise.exerciseId, {
          info: { set: item.set, reps: inp.reps ?? 0, weight: inp.weight ?? 0 },
        });
      }
    });
  };

  const addSet = () => {
    setInfo((prev) => [...prev, { set: prev.length + 1, reps: -1, weight: -1 }]);
    setInputs((prev) => [...prev, {}]);
  };

  const onChangeNotes = (value: string) => {
    cacheLogInfo(exercise.exerciseId, { notes: value });
    setCachedNotes(value);
  };

  return (
    <div className="mt-3 flex flex-col gap-2">
      {info.map((_, index) => (
        <SetRow
          key={index}
          index={index}
          state={
            index === currentSet
              ? "active"
              : index < currentSet
                ? "completed"
                : "locked"
          }
          inputValue={inputs[index] ?? {}}
          onReopen={() => setCurrentSet(index)}
          onInputChange={onInputChange}
          onConfirm={onConfirm}
          onDelete={onDelete}
        />
      ))}
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        className="mt-1 text-gray-500"
        onClick={addSet}
      >
        Add set
      </Button>
      <TextArea
        autoSize
        value={cachedNotes}
        placeholder="Notes (optional)"
        className="mt-2"
        onChange={(e) => onChangeNotes(e.target.value)}
      />
    </div>
  );
}

type SetRowProps = {
  index: number;
  state: "active" | "completed" | "locked";
  inputValue: SetInput;
  onReopen: () => void;
  onInputChange: (index: number, field: "reps" | "weight", value: number) => void;
  onConfirm: (index: number) => boolean;
  onDelete: (index: number) => void;
};

function SetRow({
  index,
  state,
  inputValue,
  onReopen,
  onInputChange,
  onConfirm,
  onDelete,
}: SetRowProps) {
  const [noRepsWarning, setNoRepsWarning] = useState(false);

  const handleConfirm = () => {
    const ok = onConfirm(index);
    setNoRepsWarning(!ok);
  };

  const disabled = state !== "active";
  const showWarning = noRepsWarning || (state === "completed" && !inputValue.reps);

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
          {state === "completed" ? <CheckOutlined /> : index + 1}
        </span>
        <InputNumber
          className="w-full"
          disabled={disabled}
          inputMode="decimal"
          value={inputValue.weight}
          onChange={(v) => onInputChange(index, "weight", v ?? 0)}
          min={0}
          suffix="kg"
        />
        <InputNumber
          className="w-full"
          disabled={disabled}
          inputMode="decimal"
          value={inputValue.reps}
          onChange={(v) => onInputChange(index, "reps", v ?? 0)}
          min={0}
          suffix="reps"
        />
        <Button
          type={state === "active" ? "primary" : "text"}
          shape="circle"
          disabled={disabled}
          icon={<CheckOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            handleConfirm();
          }}
          aria-label={`Confirm set ${index + 1}`}
        />
        <Button
          danger
          type="text"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(index);
          }}
          aria-label={`Delete set ${index + 1}`}
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
