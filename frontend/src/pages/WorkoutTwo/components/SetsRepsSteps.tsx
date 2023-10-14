import { Button, InputNumber, Space, StepProps, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useWorkoutContext } from "../WorkoutContext";
import { LogEntry, RoutineExercise } from "@backend/types";
import { CheckSquareOutlined } from "@ant-design/icons";
import colors from "@frontend/theme/colors";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";

interface SetsRepsStepsProps {
  exercise: RoutineExercise;
}

export const SetsRepsSteps: React.FC<SetsRepsStepsProps> = ({ exercise }) => {
  const { workoutData } = useWorkoutContext();

  const [currentSet, setCurrentSet] = useState(0);

  const onChange = (value: number) => {
    setCurrentSet(value);
  };

  const onClick = () => {
    setCurrentSet(currentSet + 1);
  };

  const items: StepProps[] = [];
  for (let i = 0; i < exercise.sets; i++) {
    items.push({
      title: `Set ${i + 1}`,
      description: (
        <StepRow
          exerciseId={exercise.exerciseId}
          step={i}
          disabled={currentSet !== i}
          onClick={onClick}
        />
      ),
    });
  }

  return (
    <Steps
      current={currentSet}
      onChange={onChange}
      direction="vertical"
      items={items}
    />
  );
};

interface StepsRowProps {
  exerciseId: string;
  step: number;
  disabled: boolean;
  onClick: () => void;
}

const StepRow: React.FC<StepsRowProps> = ({
  exerciseId,
  step,
  disabled,
  onClick,
}) => {
  const { writeTemporaryStorage, getTemporaryStorage } = useTemporaryStorage();
  const tempData = getTemporaryStorage(exerciseId);

  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);

  useEffect(() => {
    const fetchTemporaryStorage = async () => {
      const temporaryStorage = await tempData;
      const info = temporaryStorage?.info.find((info) => info.set === step + 1);
      setWeight(info?.weight || 0);
      setReps(info?.reps || 0);
    };

    fetchTemporaryStorage();
  }, []);

  useEffect(() => {
    writeTemporaryStorage(exerciseId, {
      set: step + 1,
      reps: reps || 0,
      weight: weight || 0,
    });
  }, [reps, weight]);

  const handleOnChangeWeight = (value: number | null) => {
    if (value || value === 0) {
      setWeight(value);
    }
  };

  const handleOnChangeReps = (value: number | null) => {
    if (value || value === 0) {
      setReps(value);
    }
  };

  return (
    <Space>
      <InputNumber
        disabled={disabled}
        onChange={handleOnChangeWeight}
        value={weight}
        inputMode="decimal"
        prefix="kg"
      />
      <InputNumber
        disabled={disabled}
        value={reps}
        onChange={handleOnChangeReps}
        inputMode="decimal"
        prefix="reps"
      />
      <Button
        disabled={disabled}
        style={{ color: disabled ? colors.grey : colors.primary }}
        type="ghost"
        onClick={onClick}
        icon={<CheckSquareOutlined size={24} />}
      />
    </Space>
  );
};
