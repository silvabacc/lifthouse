import { Skeleton, Typography } from "antd";
import React from "react";
import MealTrackerNumberText from "../MealTrackerNumberText";
import { MacroNutrientsContainer } from "./MacroNutrientsStyles";
import { useDailyWeighIn } from "@frontend/pages/DailyWeighIn/useDailyweighIn";
import { useDailyWeightInContext } from "@frontend/pages/DailyWeighIn/DailyWeightInContext";

const { Title } = Typography;

interface MacroNutrientsProps {
  calories: number;
  protein: number;
}

const MacroNutrients: React.FC<MacroNutrientsProps> = ({
  calories,
  protein,
}) => {
  const { isLoading } = useDailyWeightInContext();

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <MacroNutrientsContainer>
      <div>
        <Title level={4}>Calories</Title>
        <MealTrackerNumberText value={calories} />
      </div>
      <div>
        <Title level={4}> Protein</Title>
        <MealTrackerNumberText value={protein} />
      </div>
    </MacroNutrientsContainer>
  );
};

export default MacroNutrients;
