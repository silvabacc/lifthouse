import { Button, Calendar, InputNumber, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import Loading from "../common/Loading";
import type { Dayjs } from "dayjs";
import { CellRenderInfo } from "rc-picker/lib/interface";
import colors from "@frontend/theme/colors";
import { useDailyWeightInContext } from "./DailyWeightInContext";
import { useDailyWeighIn } from "./useDailyweighIn";

const { Text } = Typography;

const DailyWeightInCalendar: React.FC = () => {
  const {
    selectedValue,
    setMonthSelected,
    setYearSelected,
    setSelectedValue,
    dailyWeightInData,
    isLoading,
    refetch,
  } = useDailyWeightInContext();
  const { updateWeighIn, addWeighIn } = useDailyWeighIn();
  const [weight, setWeight] = useState(0);

  const onPanelChange = (date: Dayjs) => {
    setMonthSelected(date.month());
    setYearSelected(date.year());
  };

  const handleOk = async () => {
    if (
      dailyWeightInData.find((dailyWeighIn) =>
        dailyWeighIn.date.isSame(selectedValue, "day")
      )
    ) {
      await updateWeighIn(weight, selectedValue);
    } else {
      await addWeighIn(weight, selectedValue);
      setWeight(0);
    }

    refetch();
  };

  const fullCellRender = (date: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (isLoading) {
      return <Loading />;
    }

    const tooltipElement = (
      <div style={{ display: "flex", padding: 16, alignItems: "center" }}>
        <Text style={{ marginRight: 6 }}>Weight:</Text>
        <InputNumber
          style={{ marginRight: 6 }}
          min={0}
          value={weight}
          onChange={(value) => setWeight(value || 0)}
          prefix="kg"
        />
        <Button type="primary" onClick={handleOk}>
          Ok
        </Button>
      </div>
    );

    const cellDayWeighIn = dailyWeightInData.find((day) =>
      day.date.isSame(date, "day")
    );

    return (
      <Tooltip
        trigger={"click"}
        color="white"
        onOpenChange={() => setWeight(0)}
        title={tooltipElement}
        autoAdjustOverflow
      >
        <div style={{ display: "flex", flexDirection: "column", margin: 6 }}>
          {info.originNode}
          <Text style={{ fontSize: 12, color: colors.highlight }}>
            {cellDayWeighIn?.weight}
          </Text>
        </div>
      </Tooltip>
    );
  };

  return (
    <Calendar
      disabledDate={(date) => date.year() > dayjs().year()}
      fullscreen={false}
      onPanelChange={onPanelChange}
      onSelect={(date) => setSelectedValue(date)}
      fullCellRender={fullCellRender}
    />
  );
};

export default DailyWeightInCalendar;
