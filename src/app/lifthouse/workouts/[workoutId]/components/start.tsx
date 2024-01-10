import { WorkoutExercise } from "@/lib/supabase/db/types";
import { useWorkoutIdContext } from "../context";
import { Button, InputNumber, Space, StepProps, Steps } from "antd";
import { useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

type Props = {
  exercise: WorkoutExercise;
};
export function Start({ exercise }: Props) {
  const [currentSet, setCurrentSet] = useState(0);
  const items: StepProps[] = [];
  for (let i = 0; i < exercise.sets; i++) {
    items.push({
      title: `Set ${i + 1}`,
      description: (
        <StepRow
          exerciseId={exercise.exerciseId}
          step={i}
          disabled={currentSet !== i}
          onContinue={() => setCurrentSet(currentSet + 1)}
        />
      ),
    });
  }
  return (
    <div className="flex flex-col mt-4">
      <Steps
        direction="vertical"
        items={items}
        size="small"
        current={currentSet}
      />
      <Button type="link">Previous set</Button>
    </div>
  );
}

type StepRowProps = {
  exerciseId: number;
  step: number;
  disabled: boolean;
  onContinue: () => void;
};
function StepRow({ exerciseId, step, disabled, onContinue }: StepRowProps) {
  const [weight, setWeight] = useState<number>();
  const [reps, setReps] = useState<number>();

  return (
    <Space>
      <InputNumber
        disabled={disabled}
        inputMode="decimal"
        value={weight}
        onChange={(weight) => setWeight(weight ?? 0)}
        min={0}
        prefix="kg"
      />
      <InputNumber
        disabled={disabled}
        inputMode="decimal"
        value={reps}
        min={0}
        onChange={(reps) => setReps(reps ?? 0)}
        prefix="reps"
      />
      <Button
        type="link"
        disabled={disabled}
        className="p-0 m-0"
        icon={<CheckCircleOutlined className="p-0 m-0" />}
        onClick={onContinue}
      />
    </Space>
  );
}
