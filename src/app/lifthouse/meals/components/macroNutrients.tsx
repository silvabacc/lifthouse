import { Skeleton, Typography } from "antd";
import React from "react";
import NumberText from "./number";
import { HIGHLIGHT_COLOR } from "./constants";

const { Title } = Typography;

interface MacroNutrientsProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const MacroNutrients: React.FC<MacroNutrientsProps> = ({
  calories,
  protein,
  fat,
  carbs,
}) => {
  return (
    <div className="w-full">
      <div className={`text-center text-2xl ${HIGHLIGHT_COLOR}`}>
        <Title level={4}>Calories</Title>
        <NumberText value={calories} />
      </div>
      <div
        className={`flex justify-evenly text-center text-2xl ${HIGHLIGHT_COLOR}`}
      >
        <div>
          <Title level={4}>Fat</Title>
          <NumberText value={fat} />
        </div>
        <div>
          <Title level={4}>Carbs</Title>
          <NumberText value={carbs} />
        </div>
        <div>
          <Title level={4}> Protein</Title>
          <NumberText value={protein} />
        </div>
      </div>
    </div>
  );
};

export default MacroNutrients;
