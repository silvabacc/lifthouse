import React from "react";
import {
  DateLeftArrowButton,
  DateMoverContainer,
  DateRightArrowButton,
  DateSquare,
} from "./DateMoverStyles";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Space, Typography } from "antd";

const { Title } = Typography;

interface DateMoverProps {
  selectedDay: Dayjs;
  setSelectedDay: (value: Dayjs) => void;
}

const DateMover: React.FC<DateMoverProps> = ({
  selectedDay,
  setSelectedDay,
}) => {
  const onLeftArrowClick = () => {
    setSelectedDay(selectedDay.subtract(1, "day"));
  };

  const onRightArrowClick = () => {
    setSelectedDay(selectedDay.add(1, "day"));
  };

  return (
    <DateMoverContainer>
      <Space>
        <DateLeftArrowButton size={24} onClick={onLeftArrowClick} />
        <DateSquare>Today</DateSquare>
        <DateRightArrowButton size={24} onClick={onRightArrowClick} />
      </Space>
      <Title level={5}>{selectedDay.format("DD/MM/YYYY")}</Title>
    </DateMoverContainer>
  );
};

export default DateMover;
