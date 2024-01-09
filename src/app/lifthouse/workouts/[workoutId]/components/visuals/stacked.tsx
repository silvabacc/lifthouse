import { LogEntry } from "@/lib/supabase/db/types";
import { Bar } from "@ant-design/plots";
import { Alert } from "antd";

type StackedChartProps = {
  data: LogEntry[];
};
export default function StackedChart({ data }: StackedChartProps) {
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
    <Bar
      data={transformData}
      stack={true}
      xField="weight"
      yField="reps"
      colorField="date"
      label={{
        text: "reps",
        style: { dx: -10, color: "white" },
      }}
      x={{}}
    />
  );
}
