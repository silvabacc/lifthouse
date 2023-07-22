import { DailyWeighInMonth } from "@frontend/hooks/useDatabase";
import React from "react";
import { Line } from "react-chartjs-2";
import Loading from "../common/Loading";
import { Typography } from "antd";

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

  const linechartData = {
    labels,
    datasets: [
      {
        label: title,
        data: data.map((weighIn) => weighIn.weight),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "kg",
        },
      },
    },
  };

  return (
    <>
      <Title level={5}>{title}</Title>
      <Line data={linechartData} options={options} />
    </>
  );
};

export default DailyWeighInChart;
