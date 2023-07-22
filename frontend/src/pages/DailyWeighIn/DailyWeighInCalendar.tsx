import { Calendar, InputNumber, Modal, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { useDatabase } from "@frontend/hooks/useDatabase";
import Loading from "../common/Loading";

const { Text } = Typography;

const DailyWeighInCalendar: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [monthSelected, setMonthSelected] = useState(dayjs().month());
  const [yearSelected, setYearSelected] = useState(dayjs().year());
  const [weight, setWeight] = useState<number | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addWeighIn, getDailyWeighInsForMonth } = useDatabase();
  const { data, isLoading } = getDailyWeighInsForMonth(
    monthSelected,
    yearSelected
  );

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

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (isLoading) {
      return <Loading />;
    }

    const currentDayWeighIn = data?.find((day) =>
      day.date.isSame(current, "day")
    );
    if (currentDayWeighIn) {
      return (
        <Text style={{ fontSize: 12, color: "#1677ff" }}>
          {currentDayWeighIn.weight}
        </Text>
      );
    }
  };

  return (
    <>
      <Calendar
        disabledDate={(date) => date.year() > dayjs().year()}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        cellRender={cellRender}
      />
      <Modal
        title={selectedValue.format("MMMM DD, YYYY")}
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
    </>
  );
};

export default DailyWeighInCalendar;
