import { Button, Popconfirm } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Meal } from "@/lib/supabase/db/types";

interface MealCardProps {
  data: Meal;
  onDeleteCard: () => void;
}

function formatMacro(value: number) {
  return value % 1 !== 0 ? value.toFixed(1) : value;
}

const MealCard: React.FC<MealCardProps> = ({ data, onDeleteCard }) => {
  const macros = [
    { label: "Calories", value: data.calorie },
    { label: "Protein", value: data.protein },
    { label: "Carbs", value: data.carbs },
    { label: "Fat", value: data.fat },
  ];

  return (
    <div className="mx-auto mb-4 w-full max-w-lg rounded-xl border border-solid border-gray-100 bg-white p-4">
      <div className="flex items-center justify-between pb-3">
        <h3 className="m-0 text-base font-semibold text-gray-900">
          {data.mealName}
        </h3>
        <Popconfirm
          title="Delete this meal?"
          okText="Delete"
          okButtonProps={{ danger: true }}
          cancelText="Cancel"
          onConfirm={onDeleteCard}
        >
          <Button
            danger
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            aria-label={`Delete ${data.mealName}`}
          />
        </Popconfirm>
      </div>
      <div className="grid grid-cols-4 divide-x divide-y-0 divide-solid divide-gray-100 rounded-lg bg-gray-50/60 py-2 text-center">
        {macros.map((macro) => (
          <div key={macro.label}>
            <p className="m-0 text-sm font-semibold text-gray-900">
              {formatMacro(macro.value)}
            </p>
            <p className="m-0 text-xs text-gray-400">{macro.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCard;
