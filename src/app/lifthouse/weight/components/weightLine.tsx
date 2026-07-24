"use client";

import { useWeightInContext } from "../context";
import { Line } from "@ant-design/plots";

export default function WeightLine() {
  const { weightData, isLoading } = useWeightInContext();

  if (isLoading) {
    return (
      <div
        style={{ height: 240 }}
        className="animate-pulse rounded-lg bg-gray-200"
      />
    );
  }

  if (weightData.length === 0) {
    return (
      <div
        style={{ height: 240 }}
        className="flex flex-col items-center justify-center text-center"
      >
        <p className="m-0 text-base font-medium text-gray-700">
          No weigh-ins this month
        </p>
        <p className="m-0 mt-1 text-sm text-gray-400">
          Tap a day on the calendar to add one
        </p>
      </div>
    );
  }

  const transformData = weightData.map((weight) => {
    return {
      date: weight.date.toDate(),
      weight: weight.weight,
    };
  });

  return (
    <div style={{ height: 240 }}>
      <Line
        height={240}
        tooltip={false}
        className="w-full pointer-events-none"
        data={transformData}
        xField="date"
        yField="weight"
        axis={{
          y: {
            labelFormatter: (v: string) => `${v} kg`,
            style: {
              labelTransform: "rotate(360)",
            },
          },
          x: {
            labelFormatter: (v: string) =>
              new Date(v).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              }),
          },
        }}
      />
    </div>
  );
}
