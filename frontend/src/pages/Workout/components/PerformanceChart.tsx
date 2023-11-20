import { ChartData, ChartOptions } from "chart.js";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { useWorkout } from "../useWorkout";
import { Alert, DatePicker, Select, Skeleton, Space } from "antd";

interface PerformanceChartProps {
  exerciseId: string;
}

enum Mode {
  Weight = "weight",
  Reps = "reps",
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ exerciseId }) => {
  const [monthSelected, setMonthSelected] = useState(dayjs().month());
  const [yearSelected, setYearSelected] = useState(dayjs().year());
  const [mode, setMode] = useState(Mode.Weight);
  const { getExercisePerformance } = useWorkout();

  const { isLoading, data } = getExercisePerformance(
    exerciseId,
    monthSelected,
    yearSelected
  );

  const labels = data?.map((entry) => entry.date.format("Do"));

  const sets = new Set(
    data?.map((entry) => entry.info.map((i) => i.set).flat()).flat()
  );

  const linechartData: ChartData<"line"> = {
    labels: labels,
    datasets: Array.from(sets).map((set) => ({
      label: `Set ${set}`,
      data:
        data?.map((entry) => {
          const setInfo = entry.info.find((i) => i.set === set);
          return (mode === Mode.Weight ? setInfo?.weight : setInfo?.reps) || 0;
        }) || [],
    })),
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        grid: { display: false },
        title: {
          display: true,
          text: mode === Mode.Weight ? "kg" : "reps",
        },
      },
    },
  };

  if (isLoading) return <Skeleton />;

  //may need to overflow this in the future, for now it's ok
  return (
    <div style={{ marginTop: 8 }}>
      <Space
        style={{ marginBottom: 16, width: "100%", justifyContent: "flex-end" }}
      >
        <DatePicker
          inputReadOnly
          format={"MMM YYYY"}
          defaultValue={dayjs()}
          onChange={(value) => {
            if (value) {
              setMonthSelected(value.month());
              setYearSelected(value.year());
            }
          }}
          picker="month"
        />
        <Select
          value={mode}
          onChange={(value) => setMode(value as Mode)}
          options={[
            { label: "Weight", value: Mode.Weight },
            { label: "Reps", value: Mode.Reps },
          ]}
        />
      </Space>
      {!isLoading && data?.length === 0 ? (
        <Alert message="No entries for this month" type="info" showIcon />
      ) : (
        <Line data={linechartData} options={options} />
      )}
    </div>
  );
};

export default PerformanceChart;
