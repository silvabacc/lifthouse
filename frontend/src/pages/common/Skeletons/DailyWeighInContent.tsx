import { Divider } from "antd";
import React from "react";
import DailyWeighInChart from "../../DailyWeighIn/components/DailyWeighInChart";
import Header from "../Header";
import DailyWeightInAlert from "../../DailyWeighIn/components/DailyWeightInAlert";
import DailyWeightInCalendar from "../../DailyWeighIn/components/DailyWeightInCalendar";
import { useDailyWeightInContext } from "../../DailyWeighIn/DailyWeightInContext";

const DailyWeighInContent: React.FC = () => {
  const { selectedValue } = useDailyWeightInContext();

  return (
    <div style={{ height: "100%", overflow: "hidden" }}>
      <Header title="Daily Weigh In" />
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <DailyWeighInChart
          title={`Monthly progress for ${selectedValue.format("MMMM YYYY")}`}
        />
        <DailyWeightInAlert />
        <Divider style={{ margin: 8 }} />
        <DailyWeightInCalendar />
      </div>
    </div>
  );
};

export default DailyWeighInContent;
