"use client";

import React from "react";
import dayjs, { type Dayjs } from "dayjs";
import { Button, Calendar, Popover, Tooltip } from "antd";
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { DateUtils } from "@/lib/dateUtils";

interface DateMoverProps {
  selectedDay: Dayjs;
  setSelectedDay: (value: Dayjs) => void;
}

const DateMover: React.FC<DateMoverProps> = ({
  selectedDay,
  setSelectedDay,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  const onLeftArrowClick = () => setSelectedDay(selectedDay.subtract(1, "day"));
  const onRightArrowClick = () => setSelectedDay(selectedDay.add(1, "day"));
  const onSelect = (date: Dayjs) => {
    setSelectedDay(date);
    setIsCalendarOpen(false);
  };
  const onGoToToday = () => setSelectedDay(dayjs());

  const isToday = DateUtils.isToday(selectedDay);
  let title = selectedDay.format("dddd");

  if (isToday) {
    title = "Today";
  }
  if (DateUtils.isYesterday(selectedDay)) {
    title = "Yesterday";
  }

  return (
    <div className="flex flex-col items-center pt-2 text-center">
      <div className="flex items-center gap-3">
        <Button
          shape="circle"
          onClick={onLeftArrowClick}
          icon={<LeftOutlined />}
          aria-label="Previous day"
        />
        <Popover
          trigger="click"
          open={isCalendarOpen}
          onOpenChange={setIsCalendarOpen}
          styles={{ container: { width: 300 } }}
          content={
            <Calendar
              value={selectedDay}
              fullscreen={false}
              onSelect={onSelect}
            />
          }
        >
          <button
            type="button"
            className="w-44 cursor-pointer rounded-xl border border-solid border-gray-100 bg-white px-4 py-2 transition-colors hover:border-indigo-200"
          >
            <span className="block text-lg font-semibold text-gray-900">
              {title}
            </span>
            <span className="block text-xs text-gray-400">
              {selectedDay.format("DD MMM YYYY")}
            </span>
          </button>
        </Popover>
        <Button
          className={isToday ? "invisible" : "visible"}
          shape="circle"
          onClick={onRightArrowClick}
          icon={<RightOutlined />}
          aria-label="Next day"
        />
      </div>
      {!isToday && (
        <Tooltip title="Go to today">
          <Button
            type="link"
            size="small"
            className="mt-1"
            onClick={onGoToToday}
            icon={<CalendarOutlined />}
          >
            Back to today
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default DateMover;
