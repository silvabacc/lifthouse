"use client";

import { Button, InputNumber, Space } from "antd";
import type { Dayjs } from "dayjs";

type Props = {
  goalWeight: number;
  setGoalWeight: (weight: number) => void;
  onSave: () => void;
  sundayOfCurrentWeek: Dayjs;
};

export default function WeightGoalPopoverContent({
  goalWeight,
  setGoalWeight,
  onSave,
  sundayOfCurrentWeek,
}: Props) {
  return (
    <div className="p-1">
      <Space>
        <InputNumber
          inputMode="decimal"
          min={0}
          value={goalWeight}
          onChange={(value) => setGoalWeight(value || 0)}
          onFocus={(e) => e.target.select()}
          suffix="kg"
          autoFocus
        />
        <Button type="primary" onClick={onSave}>
          Save
        </Button>
      </Space>
      <p className="m-0 mt-2 text-xs text-gray-400 w-32">
        Sets your weigh-in for{" "}
        <span className="font-bold">
          {sundayOfCurrentWeek.format("DD MMM")} (this Sunday)
        </span>
      </p>
    </div>
  );
}
