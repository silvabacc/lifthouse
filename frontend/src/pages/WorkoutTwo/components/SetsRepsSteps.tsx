import { Button, InputNumber, Skeleton, Space, StepProps, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { Info, RoutineExercise } from "@backend/types";
import { CheckSquareOutlined } from "@ant-design/icons";
import colors from "@frontend/theme/colors";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { useWorkout } from "../useWorkout";

interface SetsRepsStepsProps {
  exercise: RoutineExercise;
}

export const SetsRepsSteps: React.FC<SetsRepsStepsProps> = ({ exercise }) => {
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
    <>
      <Steps
        current={currentSet}
        onChange={onChange}
        direction="vertical"
        items={items}
      />
    </>
  );
};

interface StepsRowProps {
  exerciseId: string;
  step: number;
  disabled: boolean;
  placeHolderInfo?: Info;
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

  const { getExerciseHistory } = useWorkout();

  const { data, isLoading } = getExerciseHistory(exerciseId, 0, 0);

  const placeHolderInfo = data
    ?.find((entry) => parseInt(entry.exerciseId) === parseInt(exerciseId))
    ?.info.find((info) => info.set === step + 1);

  console.log(step, placeHolderInfo);

  const [weight, setWeight] = useState<number>();
  const [reps, setReps] = useState<number>();

  useEffect(() => {
    const fetchTemporaryStorage = async () => {
      const temporaryStorage = await tempData;
      const info = temporaryStorage?.info.find((info) => info.set === step + 1);
      setWeight(info?.weight);
      setReps(info?.reps);
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
    <>
      {isLoading && <SkeletonSteps />}
      <Space>
        <InputNumber
          disabled={disabled}
          inputMode="decimal"
          onChange={handleOnChangeWeight}
          value={weight}
          placeholder={placeHolderInfo?.weight.toString()}
          prefix="kg"
        />
        <InputNumber
          disabled={disabled}
          inputMode="decimal"
          value={reps}
          onChange={handleOnChangeReps}
          placeholder={placeHolderInfo?.reps.toString()}
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
    </>
  );
};

const SkeletonSteps = () => {
  return <Skeleton paragraph={{ rows: 4 }} />;
};
