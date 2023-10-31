import { ChartData, ChartOptions } from "chart.js";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { useWorkout } from "../useWorkout";

interface PerformanceChartProps {
  exerciseId: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ exerciseId }) => {
  const [monthSelected, setMonthSelected] = useState(dayjs().month());
  const [yearSelected, setYearSelected] = useState(dayjs().year());
  const { getExercisePerformance } = useWorkout();

  const { data } = getExercisePerformance(
    exerciseId,
    monthSelected,
    yearSelected
  );

  const linechartData: ChartData<"line"> = {
    // labels,
    datasets: [
      {
        showLine: true,
        data: [],
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: { display: false },
        title: {
          display: true,
          text: "kg",
        },
      },
    },
  };

  return (
    <div style={{ height: 300 }}>
      <Line data={linechartData} options={options} />
    </div>
  );
};

export default PerformanceChart;
