import {
  Alert,
  Calendar,
  ConfigProvider,
  Divider,
  InputNumber,
  Modal,
  Space,
  Typography,
} from "antd";
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
  const [weight, setWeight] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addWeighIn, getDailyWeighInsForMonth, updateWeighIn } = useDatabase();
  const { data, isLoading, refetch } = getDailyWeighInsForMonth(
    monthSelected,
    yearSelected
  );

  const mondayOfCurrentWeek = dayjs().weekday(0);

  useEffect(() => {
    if (data) {
      const weekWeightGoal = data?.find(
        (weighIn) => weighIn.date.date() === mondayOfCurrentWeek.date()
      );
      setWeeklyGoal(weekWeightGoal?.weight || 0);
    }
  }, [data]);

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
    <ConfigProvider
      theme={{
        components: {
          Calendar: {
            miniContentHeight: window.innerHeight / 2,
          },
        },
      }}
    >
      <div style={{ height: "100%", overflow: "hidden" }}>
        <Header title="Daily Weigh In" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <DailyWeighInChart
            data={data}
            title={`Monthly progress for ${selectedValue.format("MMMM YYYY")}`}
          />
          <div
            style={{
              display: "flex",

              marginTop: 42,
            }}
          >
            {weeklyGoal === 0 ? (
              <Alert
                type="warning"
                closable
                message="No weekly goal set. Weekly goals are set when a weigh in is
              entered on the Monday of the current week"
              ></Alert>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-beween",
                  width: "100%",
                }}
              >
                <Alert
                  type="info"
                  showIcon
                  style={{ width: "100%" }}
                  message={`This Week's Weight Goal is ${(
                    weeklyGoal -
                    weeklyGoal * 0.01
                  ).toFixed(1)} kg`}
                />
              </div>
            )}
          </div>
          <Divider style={{ margin: 8 }} />
          <div
            style={{
              display: "flex",
            }}
          >
            <Calendar
              disabledDate={(date) => date.year() > dayjs().year()}
              onPanelChange={onPanelChange}
              onSelect={onSelect}
              fullscreen={false}
              cellRender={cellRender}
            />
          </div>
          <Modal
            title={selectedValue.format("MMMM Do, YYYY")}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Space
              style={{ width: "100%", justifyContent: "center", padding: 16 }}
            >
              <Text>Weight: </Text>
              <InputNumber
                min={0}
                value={weight}
                onChange={setWeight}
                prefix="kg"
              />
            </Space>
          </Modal>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DailyWeighIn;
