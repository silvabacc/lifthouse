"use client";

import React from "react";
import dayjs, { type Dayjs } from "dayjs";
import { Button, Calendar, Tooltip, Typography } from "antd";
import {
  CalendarOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
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
  const onGoToToday = () => setSelectedDay(dayjs());

  const isToday = DateUtils.isToday(selectedDay);
  let title = selectedDay.format("dddd");

  if (isToday) {
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
          styles={{ container: { width: 300 } }}
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
      <div className="flex justify-center items-center gap-2">
        <h3 className="m-0">{selectedDay.format("DD/MM/YYYY")}</h3>
        {!isToday && (
          <Tooltip title="Go to today">
            <Button
              type="primary"
              size="small"
              shape="circle"
              onClick={onGoToToday}
              icon={<CalendarOutlined />}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default DateMover;
