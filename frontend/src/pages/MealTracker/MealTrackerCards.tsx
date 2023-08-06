import { Card, Input, Space } from "antd";
import React, { useState } from "react";
import colors from "@frontend/theme/colors";
import { CardContainers, EditNameButton } from "./MealTrackerCardsStyles";
import { NutrientContainer, NutrientText } from "./MealTrackerStyles";

const MealTrackerCard: React.FC = () => {
  const [editName, setEditName] = useState(false);

  return (
    <CardContainers direction="vertical">
      <Card
        type="inner"
        extra={
          <EditNameButton
            onClick={() => setEditName((prev) => !prev)}
            color={colors.primary}
          />
        }
        title={editName ? <Input /> : "Test"}
      >
        <NutrientContainer>
          <NutrientText>Calories</NutrientText>
          <p>1487</p>
        </NutrientContainer>
        <NutrientContainer>
          <NutrientText>Protein</NutrientText>
          <p>165g</p>
        </NutrientContainer>
      </Card>
    </CardContainers>
  );
};

export default MealTrackerCard;
