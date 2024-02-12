import { LogEntry, LogInfo, WorkoutExercise } from "@/lib/supabase/db/types";
import { useWorkoutIdContext } from "../context";
import { Button, InputNumber, Space, StepProps, Steps, Tooltip } from "antd";
import { useState } from "react";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

type Props = {
  exercise: WorkoutExercise;
  latestLogInfo?: LogInfo[];
};
export function Start({ exercise, latestLogInfo }: Props) {
  const { getCachedLogInfo } = useLocalStorage();
  const highestSet = getCachedLogInfo(exercise.exerciseId)?.info.reduce(
    (acc, curr) => (curr.set > acc ? curr.set : acc),
    0
  );
  const [currentSet, setCurrentSet] = useState(highestSet || 0);

  const items: StepProps[] = [];
  for (let i = 0; i < exercise.sets; i++) {
    const latestLog = latestLogInfo?.find((l) => l.set === i + 1);

    items.push({
      title: `Set ${i + 1}`,
      description: (
        <StepRow
          exerciseId={exercise.exerciseId}
          step={i}
          placeHolder={{
            reps: latestLog?.reps.toString(),
            weight: latestLog?.weight.toString(),
          }}
          disabled={currentSet !== i}
          warningEnabled={currentSet > i}
          onContinue={() => setCurrentSet(currentSet + 1)}
        />
      ),
    });
  }
  return (
    <div style={{ minWidth: 260 }} className="flex h-full flex-col mt-4">
      <Steps
        onChange={(current) => setCurrentSet(current)}
        direction="vertical"
        items={items}
        size="small"
        current={currentSet}
      />
    </div>
  );
}

type StepRowProps = {
  exerciseId: number;
  step: number;
  disabled: boolean;
  warningEnabled: boolean; //Warnings can only appear if the current set is less than the rendered set
  placeHolder?: { reps?: string; weight?: string };
  onContinue: () => void;
};
function StepRow({
  exerciseId,
  step,
  disabled,
  warningEnabled,
  placeHolder,
  onContinue,
}: StepRowProps) {
  const [weight, setWeight] = useState<number>();
  const [reps, setReps] = useState<number>();
  const { getCachedLogInfo, cacheLogInfo } = useLocalStorage();
  const cachedInfo = getCachedLogInfo(exerciseId)?.info.find(
    (i) => i.set === step + 1
  );

  const onNext = () => {
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

  const showWarning = warningEnabled && !reps;

  return (
    <Space>
      <InputNumber
        disabled={disabled}
        inputMode="decimal"
        placeholder={placeHolder?.weight}
        value={weight}
        onChange={(weight) => setWeight(weight ?? 0)}
        defaultValue={cachedInfo?.weight}
        min={0}
        prefix="kg"
      />
      <InputNumber
        disabled={disabled}
        inputMode="decimal"
        value={reps}
        placeholder={placeHolder?.reps}
        defaultValue={cachedInfo?.reps}
        min={0}
        onChange={(reps) => setReps(reps ?? 0)}
        prefix="reps"
      />
      <Button
        type="link"
        disabled={disabled}
        className="p-0 m-0"
        icon={<CheckCircleOutlined className="p-0 m-0" />}
        onClick={onNext}
      />
      {showWarning && (
        <div onClick={(e) => e.stopPropagation()}>
          <Tooltip trigger={"click"} title="Reps is missing!">
            <WarningOutlined className="text-orange-400" />
          </Tooltip>
        </div>
      )}
    </Space>
  );
}
