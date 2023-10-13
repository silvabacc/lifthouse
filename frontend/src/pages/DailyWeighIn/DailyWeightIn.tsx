import React from "react";
import { DailyWeightInContextProvider } from "./DailyWeightInContext";
import DailyWeighInContent from "../common/Skeletons/DailyWeighInContent";
import { DailyWeighInConfigProvider } from "@frontend/theme/configProvider";

const DailyWeightIn: React.FC = () => {
  return (
    <DailyWeighInConfigProvider>
      <DailyWeightInContextProvider>
        <DailyWeighInContent />
      </DailyWeightInContextProvider>
    </DailyWeighInConfigProvider>
  );
};

export default DailyWeightIn;
