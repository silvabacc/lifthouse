import React from "react";
import { Line } from "react-chartjs-2";
import Loading from "../../common/Loading";
import { Skeleton, Typography } from "antd";
import { ChartData, ChartOptions } from "chart.js";
import { useDailyWeightInContext } from "../DailyWeightInContext";

interface DailyWeighInChartProps {
  title: string;
}

const { Title } = Typography;

const DailyWeighInChart: React.FC<DailyWeighInChartProps> = ({ title }) => {
  const { dailyWeightInData, isLoading, monthSelected } =
    useDailyWeightInContext();

  if (isLoading) {
    return (
      <Skeleton.Node style={{ width: "100%", height: 300 }} active>
        <></>
      </Skeleton.Node>
    );
  }

  const monthData = dailyWeightInData.filter(
    (weighIn) => weighIn.date.month() === monthSelected
  );

  const labels = monthData.map((weighIn) => weighIn.date.format("Do"));

  const linechartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        showLine: true,
        label: title,
        data: monthData.map((weighIn) => weighIn.weight),
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
      <div>
        <Line data={linechartData} options={options} />
      </div>
    </div>
  );
};

export default DailyWeighInChart;
