import React, { Dispatch, useEffect, useState } from "react";
import { Button, InputNumber, Space } from "antd";
import { BsCheckSquareFill } from "react-icons/bs";
import colors from "../../theme/colors";
import { useDatabase } from "../hooks/useDatabase";
import { Exercise } from "../../../../backend/data";

interface SetsRepsRow {
  exercise: Exercise;
  set: number;
  disabled?: boolean;
  next?: Dispatch<React.SetStateAction<number>>;
}

const SetsRepsRow: React.FC<SetsRepsRow> = ({
  set,
  exercise,
  disabled,
  next,
}) => {
  const { fetchTemporaryStorage, writeToTemporaryStorage } = useDatabase();
  const { data } = fetchTemporaryStorage(exercise);
  const [reps, setReps] = useState("0");
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    const tempStorage = data?.find((temp) => temp.set === set);

    if (tempStorage) {
      setReps(tempStorage.reps);
      setWeight(tempStorage.weight);
    }
  }, [data]);

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
          writeToTemporaryStorage(exercise, set, weight, reps);
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
