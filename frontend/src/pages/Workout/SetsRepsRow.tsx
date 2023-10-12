import React, { Dispatch, useEffect, useState } from "react";
import { Button, InputNumber, Space } from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";
import colors from "../../theme/colors";
import { Exercise, LogEntry } from "@backend/types";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";

interface SetsRepsRowProps {
  exercise: Exercise;
  set: number;
  overrideReps?: number;
  overrideWeights?: number;
  placeHolderInfo?: LogEntry;
  disabled?: boolean;
  next?: Dispatch<React.SetStateAction<number>>;
}

const SetsRepsRow: React.FC<SetsRepsRowProps> = ({
  set,
  overrideReps,
  overrideWeights,
  exercise,
  placeHolderInfo,
  disabled,
  next,
}) => {
  const { writeTemporaryStorage } = useTemporaryStorage();
  const [reps, setReps] = useState(overrideReps);
  const [weight, setWeight] = useState(overrideWeights);

  useEffect(() => {
    setReps(overrideReps);
    setWeight(overrideWeights);
  }, [overrideReps, overrideWeights]);

  return (
    <Space direction="horizontal">
      <InputNumber
        prefix="kg"
        disabled={disabled}
        placeholder={placeHolderInfo?.info?.[set - 1]?.weight?.toString()}
        value={weight}
        onChange={(value) => value && setWeight(value)}
      />
      <InputNumber
        prefix="reps"
        disabled={disabled}
        placeholder={placeHolderInfo?.info?.[set - 1]?.reps?.toString()}
        value={reps}
        onChange={(value) => value && setReps(value)}
      />
      <Button
        type="ghost"
        disabled={disabled}
        style={{ color: disabled ? colors.grey : colors.primary }}
        onClick={() => {
          writeTemporaryStorage(exercise.exerciseId, {
            set,
            reps: reps || 0,
            weight: weight || 0,
          });
          next && next((current) => (current += 1));
        }}
        icon={<CheckSquareOutlined size={24} />}
      />
    </Space>
  );
};

export default SetsRepsRow;
