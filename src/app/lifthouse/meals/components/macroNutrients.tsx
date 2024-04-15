import React from "react";
import NumberText from "./number";
import { HIGHLIGHT_COLOR } from "./constants";
import { Pie, PieConfig } from "@ant-design/plots";
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface MacroNutrientsProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isLoading?: boolean;
}

const MacroNutrients: React.FC<MacroNutrientsProps> = ({
  calories,
  protein,
  fat,
  carbs,
  isLoading,
}) => {
  const config: PieConfig = {
    data: [
      { type: "Protein", value: protein },
      { type: "Fats", value: fat },
      { type: "Carbs", value: carbs },
    ],
    angleField: "value",
    colorField: "type",
    tooltip: false,
    label: {
      text: "value",
      position: "inside",
    },
    legend: {
      color: {
        position: "left",
      },
    },
  };

  if (isLoading) {
    return (
      <Spin
        style={{ margin: 16 }}
        indicator={<LoadingOutlined style={{ fontSize: 128 }} spin />}
      />
    );
  }

  return (
    <div>
      <div
        className={`flex justify-evenly text-center text-2xl ${HIGHLIGHT_COLOR}`}
      >
        <p className="text-black">Calories</p>
        <NumberText value={calories} />
      </div>
      <div className="w-72">
        {(protein > 0 || carbs > 0 || fat > 0) && (
          <Pie
            className="pointer-events-none"
            {...config}
            height={200}
            width={300}
          />
        )}
      </div>
    </div>
  );
};

export default MacroNutrients;
