import React, { Dispatch } from "react";
import { Button, InputNumber, Space } from "antd";
import { BsCheckSquareFill } from "react-icons/bs";
import colors from "../../theme/colors";

interface SetsRepsRow {
  disabled?: boolean;
  next?: Dispatch<React.SetStateAction<number>>;
}

const SetsRepsRow: React.FC<SetsRepsRow> = ({ disabled, next }) => {
  return (
    <Space direction="horizontal">
      <InputNumber prefix="kg" disabled={disabled} />
      <InputNumber prefix="reps" disabled={disabled} />
      <Button
        type="ghost"
        size="large"
        disabled={disabled}
        onClick={() => next && next((current) => (current += 1))}
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
