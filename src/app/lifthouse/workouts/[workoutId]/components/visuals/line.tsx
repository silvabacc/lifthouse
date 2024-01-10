import { LogEntry } from "@/lib/supabase/db/types";
import { Line } from "@ant-design/plots";
import { Alert } from "antd";
import { useState } from "react";

type LineChartProps = {
  data: LogEntry[];
};
export default function LineChart({ data }: LineChartProps) {
  const sets = Array.from(Array(10)).map((_, i) => ({
    value: i + 1,
    label: `Set ${i + 1}`,
  }));

  if (data.length === 0) {
    return (
      <Alert
        className="mt-8"
        description="No logs have been recorded for this exercise 😢"
        type="info"
        showIcon
      />
    );
  }

  const transformData = data.flatMap((log) => {
    return log.info.map((info) => {
      return {
        date: log.date,
        weight: info.weight,
        reps: info.reps,
        set: info.set,
      };
    });
  });

  return (
    <Line
      data={transformData}
      xField="date"
      yField="weight"
      colorField="set"
      scale={{ color: { palette: "warm" } }}
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
