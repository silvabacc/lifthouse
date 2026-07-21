import React from "react";
import { Pie, PieConfig } from "@ant-design/plots";
import { Skeleton } from "antd";

interface MacroNutrientsProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isLoading?: boolean;
}

function formatMacro(value: number) {
  return value % 1 !== 0 ? value.toFixed(1) : value;
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
      text: (datum: { value: number }) => datum.value.toFixed(1),
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
      <div className="w-full max-w-lg px-4 pt-4">
        <Skeleton.Node active className="!h-24 !w-full" />
      </div>
    );
  }

  const stats = [
    { label: "Calories", value: calories, highlight: true },
    { label: "Protein", value: protein },
    { label: "Carbs", value: carbs },
    { label: "Fat", value: fat },
  ];

  return (
    <div className="flex w-full max-w-lg flex-col items-center px-4 pt-4">
      <div className="grid w-full grid-cols-4 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl p-3 text-center ${
              stat.highlight ? "bg-indigo-50" : "bg-gray-50"
            }`}
          >
            <p
              className={`m-0 text-lg font-bold ${
                stat.highlight ? "text-indigo-600" : "text-gray-900"
              }`}
            >
              {formatMacro(stat.value)}
            </p>
            <p
              className={`m-0 text-xs ${
                stat.highlight ? "text-indigo-400" : "text-gray-400"
              }`}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      {(protein > 0 || carbs > 0 || fat > 0) && (
        <div className="w-72">
          <Pie
            className="pointer-events-none"
            {...config}
            height={200}
            width={300}
          />
        </div>
      )}
    </div>
  );
};

export default MacroNutrients;
