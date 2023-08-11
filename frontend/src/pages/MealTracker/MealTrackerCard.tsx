import { Card, Input } from "antd";
import React, { useState } from "react";
import colors from "@frontend/theme/colors";
import { CardContainers, DeleteButton } from "./MealTrackerCardStyles";
import { NutrientContainer, NutrientText } from "./MealTrackerStyles";
import { Meal } from "@backend/types";

interface MealTrackerCardProps {
  data: Meal;
  onDeleteCard: () => void;
}

const MealTrackerCard: React.FC<MealTrackerCardProps> = ({
  data,
  onDeleteCard,
}) => {
  return (
    <CardContainers direction="vertical">
      <Card
        type="inner"
        extra={<DeleteButton onClick={onDeleteCard} color={colors.primary} />}
        title={data.mealName}
      >
        <NutrientContainer>
          <NutrientText>Calories</NutrientText>
          <p>{data.calories}</p>
        </NutrientContainer>
        <NutrientContainer>
          <NutrientText>Protein</NutrientText>
          <p>{data.protein}</p>
        </NutrientContainer>
      </Card>
    </CardContainers>
  );
};

export default MealTrackerCard;
