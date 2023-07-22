import { Space, Typography } from "antd";
import React from "react";
import DailyWeighInCalendar from "./DailyWeighInCalendar";

const { Title } = Typography;

const DailyWeighIn: React.FC = () => {
  return (
    <Space direction="vertical">
      <Title>Daily Weigh In</Title>
      <DailyWeighInCalendar />
    </Space>
  );
};

export default DailyWeighIn;
