import React from "react";
import { DateMoverContainer } from "./DateMoverStyles";
import type { Dayjs } from "dayjs";
import { Button, Calendar, Tooltip, Typography } from "antd";
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
  const onLeftArrowClick = () => setSelectedDay(selectedDay.subtract(1, "day"));
  const onRightArrowClick = () => setSelectedDay(selectedDay.add(1, "day"));
  const onSelect = (date: Dayjs) => setSelectedDay(date);

  let title = selectedDay.format("dddd");

  if (selectedDay.isToday()) {
    title = "Today";
  }
  if (selectedDay.isYesterday()) {
    title = "Yesterday";
  }

  const ToolTipCalendar = (
    <Calendar value={selectedDay} fullscreen={false} onSelect={onSelect} />
  );

  return (
    <div style={{ textAlign: "center" }}>
      <DateMoverContainer>
        <Button
          style={{ margin: ARROW_MARGIN }}
          type="primary"
          onClick={onLeftArrowClick}
          icon={<ArrowLeftOutlined />}
        />
        <Tooltip
          overlayInnerStyle={{ width: 300 }}
          color="white"
          title={ToolTipCalendar}
        >
          <Button style={{ width: 200, height: 50 }} type="primary">
            <Title
              level={4}
              style={{ color: "white", margin: 0, whiteSpace: "nowrap" }}
            >
              {title}
            </Title>
          </Button>
        </Tooltip>
        <Button
          style={{
            margin: ARROW_MARGIN,
            visibility: selectedDay.isToday() ? "hidden" : "visible",
          }}
          type="primary"
          onClick={onRightArrowClick}
          icon={<ArrowRightOutlined />}
        />
      </DateMoverContainer>
      <Title level={5}>{selectedDay.format("DD/MM/YYYY")}</Title>
    </div>
  );
};

export default DateMover;
