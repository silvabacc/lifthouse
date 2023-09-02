import { Calendar, InputNumber, Modal, Row, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import DailyWeighInChart from "./DailyWeighInChart";
import { useDatabase } from "@frontend/hooks/useDatabase";
import colors from "@frontend/theme/colors";
import Loading from "../common/Loading";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import Header from "../common/Header";

const { Text } = Typography;

const DailyWeighIn: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [monthSelected, setMonthSelected] = useState(dayjs().month());
  const [yearSelected, setYearSelected] = useState(dayjs().year());
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [previousWeeklyGoal, setPreviouslyWeeklyGoal] = useState(0);
  const [weight, setWeight] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addWeighIn, getDailyWeighInsForMonth, updateWeighIn } = useDatabase();
  const { data, isLoading, refetch } = getDailyWeighInsForMonth(
    monthSelected,
    yearSelected
  );

  const mondayOfCurrentWeek = dayjs().weekday(0);
  const previousMonday = dayjs().subtract(1, "week").weekday(0);

  useEffect(() => {
    if (data) {
      const weekWeightGoal = data?.find(
        (weighIn) => weighIn.date.date() === mondayOfCurrentWeek.date()
      );
      const previousWeightGoal = data?.find(
        (weighIn) => weighIn.date.date() === previousMonday.date()
      );
      setWeeklyGoal(weekWeightGoal?.weight || 0);
      setPreviouslyWeeklyGoal(previousWeightGoal?.weight || 0);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSelect = (date: Dayjs) => {
    setSelectedValue(date);

    //Stops from the modal being opened when switching month or year on the calendar
    const isSwitchingMonthOrYear =
      date.date() === selectedValue.date() ||
      (date.month() === selectedValue.month() &&
        date.year() !== selectedValue.year());

    if (isSwitchingMonthOrYear) {
      return;
    }
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (weight === null) {
      return;
    }

    if (
      data?.find((dailyWeighIn) =>
        dailyWeighIn.date.isSame(selectedValue, "day")
      )
    ) {
      await updateWeighIn(weight, selectedValue);
    } else {
      await addWeighIn(weight, selectedValue);
      setWeight(null);
    }

    refetch();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setWeight(null);
    setIsModalOpen(false);
  };

  const onPanelChange = (date: Dayjs) => {
    setMonthSelected(date.month());
    setYearSelected(date.year());
  };

  const cellRender = (current: Dayjs) => {
    if (isLoading) {
      return <Loading />;
    }

    const currentDayWeighIn = data?.find((day) =>
      day.date.isSame(current, "day")
    );
    if (currentDayWeighIn) {
      return (
        <Text style={{ fontSize: 12, color: colors.highlight }}>
          {currentDayWeighIn.weight}
        </Text>
      );
    }
  };

  return (
    <Space direction="vertical">
      <Header title="Daily Weigh In" />
      <DailyWeighInChart
        data={data}
        title={`Monthly progress for ${selectedValue.format("MMMM YYYY")}`}
      />
      {weeklyGoal === 0 ? (
        <Text strong style={{ color: colors.warning }}>
          No weekly goal set. Weekly goals are set when a weigh in is entered on
          the Monday of the current week
        </Text>
      ) : (
        <>
          <Text>
            This week's weight goal is{" "}
            <span style={{ color: colors.highlight }}>
              {(weeklyGoal - weeklyGoal * 0.01).toFixed(1)}
            </span>{" "}
            kg
          </Text>
          {previousWeeklyGoal !== 0 && (
            <Text>
              Last week's weight goal was{" "}
              <span style={{ color: colors.highlight }}>
                {(previousWeeklyGoal - previousWeeklyGoal * 0.01).toFixed(1)}
              </span>{" "}
              kg
            </Text>
          )}
        </>
      )}
      <Calendar
        disabledDate={(date) => date.year() > dayjs().year()}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        cellRender={cellRender}
      />
      <Modal
        title={selectedValue.format("MMMM Do, YYYY")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space style={{ width: "100%", justifyContent: "center", padding: 16 }}>
          <Text>Weight: </Text>
          <InputNumber
            min={0}
            value={weight}
            onChange={setWeight}
            prefix="kg"
          />
        </Space>
      </Modal>
    </Space>
  );
};

export default DailyWeighIn;
