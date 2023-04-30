import React, { Dispatch, useEffect, useState } from "react";
import { Button, InputNumber, Space } from "antd";
import { BsCheckSquareFill } from "react-icons/bs";
import colors from "../../theme/colors";
import { useDatabase } from "../hooks/useDatabase";
import { Exercise, Routine } from "../../../../backend/data";
import { useParams } from "react-router-dom";

interface SetsRepsRow {
  exercise: Exercise;
  set: number;
  overrideReps?: string;
  overrideWeights?: number;
  disabled?: boolean;
  next?: Dispatch<React.SetStateAction<number>>;
}

const SetsRepsRow: React.FC<SetsRepsRow> = ({
  set,
  overrideReps = "0",
  overrideWeights = 0,
  exercise,
  disabled,
  next,
}) => {
  const { writeToTemporaryStorage } = useDatabase();
  const { routineType } = useParams();
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
        onChange={(value) => value && setWeight(value as number)}
      />
      <InputNumber
        prefix="reps"
        disabled={disabled}
        value={reps}
        onChange={(value) => value && setReps(value as string)}
      />
      <Button
        type="ghost"
        size="large"
        disabled={disabled}
        onClick={() => {
          writeToTemporaryStorage(
            exercise,
            routineType as Routine,
            set,
            weight,
            reps
          );
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
