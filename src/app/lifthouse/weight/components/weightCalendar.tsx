"use client";

import { Button, Calendar, InputNumber, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { useWeightInContext } from "../context";
import type { Dayjs } from "dayjs";
import { CellRenderInfo } from "rc-picker/lib/interface";
import { useState } from "react";
import WeightCalendarSkeleton from "./weightCalendar.skeleton";

export default function WeightCalendar() {
  const {
    selectedValue,
    setMonthSelected,
    setYearSelected,
    setSelectedValue,
    weightData,
  } = useWeightInContext();
  const [weight, setWeight] = useState(0);

  const onPanelChange = (date: Dayjs) => {
    setMonthSelected(date.month());
    setYearSelected(date.year());
  };

  const handleOk = () => {};

  const fullCellRender = (date: Dayjs, info: CellRenderInfo<Dayjs>) => {
    const tooltipElement = (
      <Space className="p-2">
        <p className="text-black">Weight:</p>
        <InputNumber
          inputMode="decimal"
          min={0}
          value={weight}
          onChange={(value) => setWeight(value || 0)}
          prefix="kg"
        />
        <Button type="primary" onClick={handleOk}>
          Ok
        </Button>
      </Space>
    );

    const cellDayWeighIn = weightData?.find((day) =>
      day.date.isSame(date, "day")
    );

    return (
      <Tooltip
        trigger={"click"}
        color="white"
        onOpenChange={() => setWeight(0)}
        title={tooltipElement}
        autoAdjustOverflow
      >
        <div className="flex flex-col m-6">
          {info.originNode}
          <p className="text-sm text-blue-600">{cellDayWeighIn?.weight}</p>
        </div>
      </Tooltip>
    );
  };

  if (weightData.length === 0) {
    return <WeightCalendarSkeleton />;
  }

  return (
    <Calendar
      className="pr-4 w-80"
      disabledDate={(date) => date.year() > dayjs().year()}
      fullscreen={false}
      onPanelChange={onPanelChange}
      onSelect={(date) => setSelectedValue(date)}
      fullCellRender={fullCellRender}
    />
  );
}
