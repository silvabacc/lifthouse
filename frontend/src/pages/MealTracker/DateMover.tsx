import React from "react";
import { DateMoverContainer, DateSquare } from "./DateMoverStyles";
import type { Dayjs } from "dayjs";
import { Button, Typography } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ARROW_MARGIN = 32;

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

  let title = selectedDay.format("dddd");

  if (selectedDay.isToday()) {
    title = "Today";
  }
  if (selectedDay.isYesterday()) {
    title = "Yesterday";
  }

  return (
    <div style={{ textAlign: "center" }}>
      <DateMoverContainer>
        <Button
          style={{ margin: ARROW_MARGIN }}
          shape="circle"
          onClick={onLeftArrowClick}
          icon={<ArrowLeftOutlined />}
        />
        <DateSquare>
          <Title
            level={4}
            style={{ color: "white", margin: 0, whiteSpace: "nowrap" }}
          >
            {title}
          </Title>
        </DateSquare>
        <Button
          style={{
            margin: ARROW_MARGIN,
            visibility: selectedDay.isToday() ? "hidden" : "visible",
          }}
          shape="circle"
          onClick={onRightArrowClick}
          icon={<ArrowRightOutlined />}
        />
      </DateMoverContainer>
      <Title level={5}>{selectedDay.format("DD/MM/YYYY")}</Title>
    </div>
  );
};

export default DateMover;
