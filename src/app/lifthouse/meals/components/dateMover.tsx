"use client";

import React from "react";
import type { Dayjs } from "dayjs";
import { Button, Calendar, Tooltip, Typography } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { DateUtils } from "@/lib/dateUtils";

const { Title } = Typography;

const ARROW_MARGIN = "m-8";

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

  if (DateUtils.isToday(selectedDay)) {
    title = "Today";
  }
  if (DateUtils.isYesterday(selectedDay)) {
    title = "Yesterday";
  }

  const ToolTipCalendar = (
    <Calendar value={selectedDay} fullscreen={false} onSelect={onSelect} />
  );

  return (
    <div className="text-center">
      <div className="flex justify-center items-center">
        <Button
          className={ARROW_MARGIN}
          shape="circle"
          type="primary"
          onClick={onLeftArrowClick}
          icon={<ArrowLeftOutlined />}
        />
        <Tooltip
          overlayInnerStyle={{ width: 300 }}
          color="white"
          title={ToolTipCalendar}
        >
          <div className="w-40 rounded bg-blue-500 text-white cursor-pointer px-4">
            <h1 className="text-xl">{title}</h1>
          </div>
        </Tooltip>
        <Button
          className={`${ARROW_MARGIN} ${
            DateUtils.isToday(selectedDay) ? "invisible" : "visible"
          }`}
          shape="circle"
          type="primary"
          onClick={onRightArrowClick}
          icon={<ArrowRightOutlined />}
        />
      </div>
      <h3 className="m-0">{selectedDay.format("DD/MM/YYYY")}</h3>
    </div>
  );
};

export default DateMover;
