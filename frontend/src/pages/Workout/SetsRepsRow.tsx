import React, { Dispatch, useEffect, useState } from "react";
import { Button, InputNumber, Space } from "antd";
import { BsCheckSquareFill } from "react-icons/bs";
import colors from "../../theme/colors";
import { useParams } from "react-router-dom";
import { Exercise, Routine } from "@backend/types";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";

interface SetsRepsRowProps {
  exercise: Exercise;
  set: number;
  overrideReps?: number;
  overrideWeights?: number;
  disabled?: boolean;
  next?: Dispatch<React.SetStateAction<number>>;
}

const SetsRepsRow: React.FC<SetsRepsRowProps> = ({
  set,
  overrideReps = 0,
  overrideWeights = 0,
  exercise,
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
        value={weight}
        onChange={(value) => value && setWeight(value)}
      />
      <InputNumber
        prefix="reps"
        disabled={disabled}
        value={reps}
        onChange={(value) => value && setReps(value)}
      />
      <Button
        type="ghost"
        disabled={disabled}
        onClick={() => {
          writeTemporaryStorage(exercise.exerciseId, set, reps, weight);
          next && next((current) => (current += 1));
        }}
        icon={
          <BsCheckSquareFill
            color={disabled ? colors.grey : colors.primary}
            size={24}
          />
        }
      />
    </Space>
  );
};

export default SetsRepsRow;
