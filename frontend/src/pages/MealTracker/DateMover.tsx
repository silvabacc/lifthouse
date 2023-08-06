import React from "react";
import {
  DateLeftArrowButton,
  DateMoverContainer,
  DateRightArrowButton,
  DateSquare,
} from "./DateMoverStyles";
import { Space, Typography } from "antd";

const { Title } = Typography;

const DateMover: React.FC = () => {
  return (
    <DateMoverContainer>
      <Space>
        <DateLeftArrowButton size={24} />
        <DateSquare>Today</DateSquare>
        <DateRightArrowButton size={24} />
      </Space>
      <Title level={5}>02/01/20203</Title>
    </DateMoverContainer>
  );
};

export default DateMover;
