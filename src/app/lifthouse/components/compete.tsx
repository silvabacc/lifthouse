"use client";

import { LogInfo, Exercise } from "@/lib/supabase/db/types";
import {
  Button,
  Input,
  InputNumber,
  StepsProps,
  Steps,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

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

export function Complete({ exercise }: Props) {
  const { getCachedLogInfo, cacheLogInfo, clearCacheLogInfo } = useLocalStorage();
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

  const onStepChange = (current: number) => {
    if (current < currentSet) setCurrentSet(current);
  };

  const onInputChange = (index: number, field: "reps" | "weight", value: number) => {
    setInputs((prev) => prev.map((inp, i) => (i === index ? { ...inp, [field]: value } : inp)));
  };

  const onNext = (index: number) => {
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

  const items: NonNullable<StepsProps["items"]> = info.map((_, index) => ({
    title: `Set ${index + 1}`,
    content: (
      <StepRow
        key={index}
        index={index}
        disabled={currentSet !== index}
        warningEnabled={currentSet > index}
        inputValue={inputs[index] ?? {}}
        onInputChange={onInputChange}
        onNext={onNext}
        onDelete={onDelete}
      />
    ),
  }));

  return (
    <div style={{ minWidth: 260 }} className="flex h-full flex-col mt-4">
      <Steps
        onChange={onStepChange}
        orientation="vertical"
        items={items}
        size="small"
        current={currentSet}
      />
      <div className="flex justify-center">
        <Button type="link" icon={<PlusSquareOutlined />} onClick={addSet} />
      </div>
      <h3 className="m-0">Notes</h3>
      <TextArea
        autoSize
        value={cachedNotes}
        className="mt-4"
        onChange={(e) => onChangeNotes(e.target.value)}
      />
    </div>
  );
}

type StepRowProps = {
  index: number;
  disabled: boolean;
  warningEnabled: boolean;
  inputValue: SetInput;
  onInputChange: (index: number, field: "reps" | "weight", value: number) => void;
  onNext: (index: number) => boolean;
  onDelete: (index: number) => void;
};

function StepRow({
  index,
  disabled,
  warningEnabled,
  inputValue,
  onInputChange,
  onNext,
  onDelete,
}: StepRowProps) {
  const [noRepsWarning, setNoRepsWarning] = useState(false);

  const handleNext = () => {
    const ok = onNext(index);
    setNoRepsWarning(!ok);
  };

  const showWarning = noRepsWarning || (warningEnabled && !inputValue.reps);

  return (
    <div className="flex w-full items-center gap-2">
      <InputNumber
        className="flex-1"
        disabled={disabled}
        inputMode="decimal"
        value={inputValue.weight}
        onChange={(v) => onInputChange(index, "weight", v ?? 0)}
        min={0}
        prefix="kg"
      />
      <InputNumber
        className="flex-1"
        disabled={disabled}
        inputMode="decimal"
        value={inputValue.reps}
        onChange={(v) => onInputChange(index, "reps", v ?? 0)}
        min={0}
        prefix="reps"
      />
      <Button
        type="link"
        disabled={disabled}
        className="p-0 m-0 shrink-0"
        icon={<CheckCircleOutlined />}
        onClick={handleNext}
      />
      <Button
        danger
        type="link"
        className="p-0 m-0 shrink-0"
        icon={<DeleteOutlined />}
        onClick={(e) => { e.preventDefault(); onDelete(index); }}
      />
      {showWarning && (
        <div onClick={(e) => e.stopPropagation()} className="shrink-0">
          <Tooltip trigger="click" title="Reps is missing!">
            <Button type="link" className="p-0 m-0 text-orange-400" icon={<WarningOutlined />} />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
