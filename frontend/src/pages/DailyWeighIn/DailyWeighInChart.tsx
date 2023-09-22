import { DailyWeighInMonth } from "@frontend/hooks/useDatabase";
import React from "react";
import { Line } from "react-chartjs-2";
import Loading from "../common/Loading";
import { Typography } from "antd";
import { ChartData, ChartOptions } from "chart.js";

interface DailyWeighInChartProps {
  data?: DailyWeighInMonth[];
  title: string;
}

const { Title } = Typography;

const DailyWeighInChart: React.FC<DailyWeighInChartProps> = ({
  data,
  title,
}) => {
  if (!data) {
    return <Loading />;
  }

  const labels = data.map((weighIn) => weighIn.date.format("Do"));

  const linechartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        showLine: true,
        label: title,
        data: data.map((weighIn) => weighIn.weight),
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
    <div style={{ height: "20%" }}>
      <Title level={5}>{title}</Title>
      <Line data={linechartData} options={options} />
    </div>
  );
};

export default DailyWeighInChart;
