"use client";

import { Popover, Skeleton } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Weight } from "@/lib/supabase/db/types";
import { useWeightInContext } from "../context";
import WeightGoalPopoverContent from "./weightGoalPopoverContent";

/**
 * Summary tiles for the selected month: latest weigh-in, change across the
 * month's entries, entry count, and this week's weight goal. Derived purely
 * from context data.
 */
export default function WeightStats() {
  const { weightData, setWeightData, isLoading, selectedValue } =
    useWeightInContext();
  const [goalWeight, setGoalWeight] = useState(0);
  const [goalPopoverOpen, setGoalPopoverOpen] = useState(false);
  const { fetch } = useFetch();

  if (weightData.length === 0) return null;

  const sorted = [...weightData].sort(
    (a, b) => a.date.valueOf() - b.date.valueOf(),
  );
  const latest = sorted[sorted.length - 1];
  const first = sorted[0];
  const change = latest.weight - first.weight;
  const hasChange = sorted.length > 1 && change !== 0;

  const isCurrentMonth =
    selectedValue.year() === dayjs().year() &&
    selectedValue.month() === dayjs().month();
  const sundayOfCurrentWeek = dayjs().day(0);
  const sundayWeighIn = isCurrentMonth
    ? weightData.find(
        (day) =>
          day.date.date() === sundayOfCurrentWeek.date() &&
          day.date.month() === sundayOfCurrentWeek.month(),
      )
    : undefined;
  const weeklyGoalNotSet = isCurrentMonth && !sundayWeighIn;

  const saveGoalWeight = async () => {
    if (goalWeight <= 0) return;
    const newWeight: Weight = await fetch(`/api/weight`, {
      method: "POST",
      body: JSON.stringify({ weight: goalWeight, date: sundayOfCurrentWeek }),
    });
    setWeightData((prev) =>
      [...prev, { ...newWeight, date: dayjs(newWeight.date) }].sort(
        (a, b) => a.date.valueOf() - b.date.valueOf(),
      ),
    );
    setGoalPopoverOpen(false);
  };

  const stats = [
    {
      label: `Latest (${latest.date.format("DD MMM")})`,
      value: `${latest.weight} kg`,
    },
    {
      label: "Change this month",
      value: hasChange ? (
        <span className={change < 0 ? "text-green-600" : "text-amber-600"}>
          {change < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}{" "}
          {Math.abs(change).toFixed(1)} kg
        </span>
      ) : (
        "–"
      ),
    },
    {
      label: "Weigh-ins",
      value: `${sorted.length}`,
    },
    {
      label: "This Week's Goal",
      value: !isCurrentMonth ? (
        "–"
      ) : weeklyGoalNotSet ? (
        <Popover
          trigger="click"
          placement="bottom"
          open={goalPopoverOpen}
          onOpenChange={(open) => {
            setGoalPopoverOpen(open);
            if (open) setGoalWeight(0);
          }}
          content={
            <WeightGoalPopoverContent
              goalWeight={goalWeight}
              setGoalWeight={setGoalWeight}
              onSave={saveGoalWeight}
              sundayOfCurrentWeek={sundayOfCurrentWeek}
            />
          }
        >
          <span className="cursor-pointer text-amber-600 underline decoration-dotted">
            Set weight
          </span>
        </Popover>
      ) : (
        `${(sundayWeighIn!.weight - sundayWeighIn!.weight * 0.01).toFixed(1)} kg`
      ),
      warn: weeklyGoalNotSet,
    },
  ];

  return (
    <div className="mb-4 grid grid-cols-2 gap-2 sm:max-w-xl sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl border p-3 text-center sm:text-left ${
            stat.warn
              ? "border-amber-200 bg-amber-50"
              : "border-transparent bg-gray-50"
          }`}
        >
          <p className="m-0 text-base font-bold text-gray-900">{stat.value}</p>
          <p className="m-0 text-xs text-gray-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
