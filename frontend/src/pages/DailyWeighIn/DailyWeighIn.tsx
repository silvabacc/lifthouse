import { Calendar, InputNumber, Modal, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import DailyWeighInChart from "./DailyWeighInChart";
import { useDatabase } from "@frontend/hooks/useDatabase";
import colors from "@frontend/theme/colors";
import Loading from "../common/Loading";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const DailyWeighIn: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [monthSelected, setMonthSelected] = useState(dayjs().month());
  const [yearSelected, setYearSelected] = useState(dayjs().year());
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [weight, setWeight] = useState<number | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addWeighIn, getDailyWeighInsForMonth } = useDatabase();
  const { data, isLoading } = getDailyWeighInsForMonth(
    monthSelected,
    yearSelected
  );

  const mondayOfCurrentWeek = dayjs().weekday(0);

  useEffect(() => {
    if (data) {
      const weekWeightGoal = data?.find(
        (weighIn) => weighIn.date.day() === mondayOfCurrentWeek.day()
      );
      setWeeklyGoal(weekWeightGoal?.weight || 0);
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

  const handleOk = () => {
    if (weight) {
      addWeighIn(weight, selectedValue);
      setWeight(null);
    }
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
      <Title>Daily Weigh In</Title>
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
        <Text>
          This week's weight goal is{" "}
          <span style={{ color: colors.highlight }}>{weeklyGoal}</span> kg
        </Text>
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
            value={weight}
            onChange={setWeight}
            min={1}
            prefix="kg"
          />
        </Space>
      </Modal>
    </Space>
  );
};

export default DailyWeighIn;
