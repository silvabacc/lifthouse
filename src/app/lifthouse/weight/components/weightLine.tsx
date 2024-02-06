"use client";

import { useWeightInContext } from "../context";
import { Line } from "@ant-design/plots";

export default function WeightLine() {
  const { weightData } = useWeightInContext();

  if (weightData.length === 0) {
    return null;
  }

  const transformData = weightData.map((weight) => {
    return {
      date: weight.date.toDate(),
      weight: weight.weight,
    };
  });

  return (
    <Line
      height={350}
      className="w-full"
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
  );
}
