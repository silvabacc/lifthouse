"use client";

import { Alert, Skeleton } from "antd";
import { useWeightInContext } from "../context";
import dayjs from "dayjs";

export default function WeightAlert() {
  const { weightData, isLoading, selectedValue } = useWeightInContext();

  if (isLoading) {
    return <Skeleton active />;
  }

  const mondayOfCurrentWeek = dayjs().day(0);

  const weeklyGoal =
    weightData?.find(
      (weighIn) =>
        weighIn.date.date() === mondayOfCurrentWeek.date() &&
        weighIn.date.month() === mondayOfCurrentWeek.month()
    )?.weight || 0;

  if (
    selectedValue.year() !== dayjs().year() ||
    selectedValue.month() !== dayjs().month()
  ) {
    return null;
  }

  return (
    <div className="pt-2">
      {weeklyGoal === 0 ? (
        <Alert
          type="warning"
          closable
          message="No weekly goal set. Weekly goals are set when a weigh in is
entered on the Sunday of the current week"
        />
      ) : (
        <Alert
          type="info"
          showIcon
          style={{ width: "100%" }}
          message={`This Week's Weight Goal is ${(
            weeklyGoal -
            weeklyGoal * 0.01
          ).toFixed(1)} kg`}
        />
      )}
    </div>
  );
}
