"use client";

import { Button, Calendar, InputNumber, Popover, Space } from "antd";
import dayjs from "dayjs";
import { useWeightInContext } from "../context";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "@rc-component/picker/interface";
import { useState } from "react";
import { useFetch } from "../../../../../hooks/useFetch";
import { Weight } from "@/lib/supabase/db/types";
import WeightCalendarSkeleton from "./weightCalendar.skeleton";

export default function WeightCalendar() {
  const {
    selectedValue,
    setMonthSelected,
    setYearSelected,
    setSelectedValue,
    weightData,
    setWeightData,
    isLoading,
  } = useWeightInContext();
  const [weight, setWeight] = useState(0);
  const [openDate, setOpenDate] = useState<Dayjs | null>(null);
  const { fetch } = useFetch();

  const onPanelChange = (date: Dayjs) => {
    setMonthSelected(date.month());
    setYearSelected(date.year());
  };

  const handleOk = async (weightId?: number) => {
    if (weightId) {
      if (weight <= 0) {
        fetch(`/api/weight/${weightId}`, {
          method: "DELETE",
        });
        setWeightData((prev) => prev.filter((day) => day.id !== weightId));
        setOpenDate(null);
        return;
      }

      const updatedWeight: Weight = await fetch(`/api/weight/${weightId}`, {
        method: "PUT",
        body: JSON.stringify({ weight }),
      });
      setWeightData((prev) =>
        [
          ...prev.filter((w) => w.id !== weightId),
          { ...updatedWeight, date: dayjs(updatedWeight.date) },
        ].sort((a, b) => a.date.valueOf() - b.date.valueOf()),
      );
    } else {
      const newWeight: Weight = await fetch(`/api/weight`, {
        method: "POST",
        body: JSON.stringify({ weight, date: selectedValue }),
      });

      setWeightData((prev) =>
        [...prev, { ...newWeight, date: dayjs(newWeight.date) }].sort(
          (a, b) => a.date.valueOf() - b.date.valueOf(),
        ),
      );
    }

    setOpenDate(null);
  };

  const fullCellRender = (date: Dayjs, info: CellRenderInfo<Dayjs>) => {
    const cellDayWeighIn = weightData?.find((day) =>
      day.date.isSame(date, "day"),
    );

    const popoverContent = (
      <div className="p-1">
        <Space>
          <InputNumber
            inputMode="decimal"
            min={0}
            value={weight}
            onChange={(value) => setWeight(value || 0)}
            onFocus={(e) => e.target.select()}
            suffix="kg"
            autoFocus
          />
          <Button type="primary" onClick={() => handleOk(cellDayWeighIn?.id)}>
            Save
          </Button>
        </Space>
        {cellDayWeighIn && (
          <p className="m-0 mt-2 text-xs text-gray-400">
            Set to 0 to remove this weigh-in
          </p>
        )}
      </div>
    );

    if (isLoading) {
      return <WeightCalendarSkeleton />;
    }

    return (
      <Popover
        trigger="click"
        open={!!openDate && openDate.isSame(date, "day")}
        onOpenChange={(open) => {
          setOpenDate(open ? date : null);
          setWeight(cellDayWeighIn?.weight ?? 0);
        }}
        content={popoverContent}
      >
        <div className="m-4 flex flex-col items-center sm:m-6">
          {info.originNode}
          {cellDayWeighIn ? (
            <span className="mt-0.5 rounded-full bg-indigo-50 px-1.5 text-xs font-medium text-indigo-600">
              {cellDayWeighIn.weight}
            </span>
          ) : (
            <span className="mt-0.5 h-4 text-xs text-transparent">–</span>
          )}
        </div>
      </Popover>
    );
  };

  return (
    <Calendar
      className="pr-4"
      disabledDate={(date) => date.year() > dayjs().year()}
      fullscreen={false}
      onPanelChange={onPanelChange}
      onSelect={(date) => setSelectedValue(date)}
      fullCellRender={fullCellRender}
    />
  );
}
