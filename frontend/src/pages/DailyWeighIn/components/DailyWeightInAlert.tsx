import { Alert, Skeleton } from "antd";
import React from "react";
import { useDailyWeightInContext } from "../DailyWeightInContext";
import dayjs from "dayjs";

const DailyWeightInAlert: React.FC = () => {
  const { dailyWeightInData, isLoading } = useDailyWeightInContext();

  if (isLoading) {
    return <Skeleton active />;
  }

  const mondayOfCurrentWeek = dayjs().weekday(0);

  const weeklyGoal =
    dailyWeightInData?.find(
      (weighIn) =>
        weighIn.date.date() === mondayOfCurrentWeek.date() &&
        weighIn.date.month() === mondayOfCurrentWeek.month()
    )?.weight || 0;

  return (
    <div style={{ marginTop: 42 }}>
      {weeklyGoal === 0 ? (
        <Alert
          type="warning"
          closable
          message="No weekly goal set. Weekly goals are set when a weigh in is
entered on the Monday of the current week"
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
};

export default DailyWeightInAlert;
