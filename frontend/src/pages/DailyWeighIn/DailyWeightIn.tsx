import React from "react";
import { DailyWeighInConfigProvider } from "./DailyWeighInStyles";
import { DailyWeightInContextProvider } from "./DailyWeightInContext";
import DailyWeighInContent from "./DailyWeighInContent";

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
