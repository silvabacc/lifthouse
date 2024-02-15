import { Button, Card } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import NumberText from "./number";
import { Meal } from "@/lib/supabase/db/types";

interface MealCardProps {
  data: Meal;
  onDeleteCard: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ data, onDeleteCard }) => {
  return (
    <Card
      style={{ maxWidth: 500, margin: "auto", marginBottom: 16 }}
      type="inner"
      extra={
        <Button
          type="text"
          icon={
            <DeleteOutlined className="text-red-500" onClick={onDeleteCard} />
          }
        />
      }
      title={data.mealName}
    >
      <div className="flex justify-between">
        <p className="text-slate-400 mr-2.5">Calories</p>
        <NumberText value={data.calories} />
      </div>
      <div className="flex justify-between">
        <p className="text-slate-400">Fat</p>
        <NumberText value={data.fat} />
      </div>
      <div className="flex justify-between">
        <p className="text-slate-400">Carbs</p>
        <NumberText value={data.carbs} />
      </div>
      <div className="flex justify-between">
        <p className="text-slate-400">Protein</p>
        <NumberText value={data.protein} />
      </div>
    </Card>
  );
};

export default MealCard;
