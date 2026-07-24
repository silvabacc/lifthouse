"use client";

import { useWeightInContext } from "../context";
import { Column } from "@ant-design/plots";
import type { Dayjs } from "dayjs";

const LOSS_COLOR = "#16a34a";
const GAIN_COLOR = "#d97706";
const FLAT_COLOR = "#9ca3af";
const TREND_COLOR = "#4f46e5";

interface ChangePoint {
  date: Date;
  change: number;
  avg: number;
}

function buildChangeData(weightData: { date: Dayjs; weight: number }[]) {
  const sorted = [...weightData].sort(
    (a, b) => a.date.valueOf() - b.date.valueOf(),
  );

  const daily = sorted.slice(1).map((entry, i) => ({
    date: entry.date,
    change: entry.weight - sorted[i].weight,
  }));

  return daily.map((point, i): ChangePoint => {
    const windowStart = point.date.subtract(6, "day");
    const window = daily
      .slice(0, i + 1)
      .filter((p) => !p.date.isBefore(windowStart, "day"));
    const avg = window.reduce((sum, p) => sum + p.change, 0) / window.length;

    return { date: point.date.toDate(), change: point.change, avg };
  });
}

const formatKg = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)} kg`;

export default function WeightChangeChart() {
  const { weightData, isLoading } = useWeightInContext();

  if (isLoading) {
    return (
      <div
        style={{ height: 240 }}
        className="animate-pulse rounded-lg bg-gray-200"
      />
    );
  }

  const data = buildChangeData(weightData);

  if (data.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="m-0 text-sm text-gray-400">
          Not enough weigh-ins this month to show change
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="min-h-0" style={{ height: 240 }}>
        <Column
          autoFit
          data={data}
          xField="date"
          yField="change"
          style={{
            fill: (d: ChangePoint) =>
              d.change < 0
                ? LOSS_COLOR
                : d.change > 0
                  ? GAIN_COLOR
                  : FLAT_COLOR,
            maxWidth: 16,
            radiusTopLeft: (d: ChangePoint) => (d.change >= 0 ? 4 : 0),
            radiusTopRight: (d: ChangePoint) => (d.change >= 0 ? 4 : 0),
            radiusBottomLeft: (d: ChangePoint) => (d.change < 0 ? 4 : 0),
            radiusBottomRight: (d: ChangePoint) => (d.change < 0 ? 4 : 0),
          }}
          line={{
            yField: "avg",
            style: {
              stroke: TREND_COLOR,
              lineWidth: 2,
            },
          }}
          axis={{
            y: {
              labelFormatter: (v: string) => `${v} kg`,
            },
            x: {
              labelFormatter: (v: string) =>
                new Date(v).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                }),
            },
          }}
          tooltip={{
            items: [
              {
                field: "change",
                name: "Daily change",
                valueFormatter: formatKg,
              },
              {
                field: "avg",
                name: "7-day avg",
                valueFormatter: formatKg,
              },
            ],
          }}
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: LOSS_COLOR }}
          />
          Weight down
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: GAIN_COLOR }}
          />
          Weight up
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-0.5 w-3"
            style={{ backgroundColor: TREND_COLOR }}
          />
          7-day avg
        </span>
      </div>
    </div>
  );
}
