"use client";

import { Skeleton } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useWeightInContext } from "../context";

/**
 * Summary tiles for the selected month: latest weigh-in, change across the
 * month's entries, and entry count. Derived purely from context data.
 */
export default function WeightStats() {
  const { weightData } = useWeightInContext();

  if (weightData.length === 0) return null;

  const sorted = [...weightData].sort(
    (a, b) => a.date.valueOf() - b.date.valueOf(),
  );
  const latest = sorted[sorted.length - 1];
  const first = sorted[0];
  const change = latest.weight - first.weight;
  const hasChange = sorted.length > 1 && change !== 0;

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
  ];

  return (
    <div className="mb-4 grid grid-cols-3 gap-2 sm:max-w-lg">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl bg-gray-50 p-3 text-center sm:text-left"
        >
          <p className="m-0 text-base font-bold text-gray-900">{stat.value}</p>
          <p className="m-0 text-xs text-gray-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
