import { Card } from "antd";
import React from "react";
import colors from "@frontend/theme/colors";
import { DeleteButton } from "./MealTrackerCardStyles";
import { NutrientContainer, NutrientText } from "./MealTrackerStyles";
import { Meal } from "@backend/types";
import MealTrackerNumberText from "./MealTrackerNumberText";

interface MealTrackerCardProps {
  data: Meal;
  onDeleteCard: () => void;
}

const MealTrackerCard: React.FC<MealTrackerCardProps> = ({
  data,
  onDeleteCard,
}) => {
  return (
    <Card
      style={{ maxWidth: 500, margin: "auto", marginBottom: 16 }}
      type="inner"
      extra={
        <DeleteButton
          style={{ cursor: "pointer" }}
          onClick={onDeleteCard}
          color={colors.primary}
        />
      }
      title={data.mealName}
    >
      <NutrientContainer>
        <NutrientText>Calories</NutrientText>
        <MealTrackerNumberText value={data.calories} />
      </NutrientContainer>
      <NutrientContainer>
        <NutrientText>Protein</NutrientText>
        <MealTrackerNumberText value={data.protein} />
      </NutrientContainer>
    </Card>
  );
};

export default MealTrackerCard;
