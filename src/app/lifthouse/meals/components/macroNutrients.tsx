import { Divider, Typography } from "antd";
import React from "react";
import NumberText from "./number";
import { HIGHLIGHT_COLOR } from "./constants";
import { Pie } from "@ant-design/plots";

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
  const config = {
    data: [
      { type: "Protein", value: protein },
      { type: "Fats", value: fat },
      { type: "Carbs", value: carbs },
    ],
    angleField: "value",
    colorField: "type",
    tooltip: false,
    legend: {
      color: {
        position: "left",
      },
    },
  };

  return (
    <div className="w-72">
      <div
        className={`flex justify-evenly text-center text-2xl ${HIGHLIGHT_COLOR}`}
      >
        <p className="text-black">Calories</p>
        <NumberText value={calories} />
      </div>
      {(protein > 0 || carbs > 0 || fat > 0) && (
        <Pie {...config} height={200} width={300} />
      )}
    </div>
  );
};

export default MacroNutrients;
