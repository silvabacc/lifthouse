import { Card, Input } from "antd";
import React, { useState } from "react";
import colors from "@frontend/theme/colors";
import {
  CardContainers,
  DeleteButton,
  EditNameButton,
} from "./MealTrackerCardsStyles";
import { NutrientContainer, NutrientText } from "./MealTrackerStyles";

const MealTrackerCard: React.FC = () => {
  const [editName, setEditName] = useState(false);
  const [mealTitle, setMealTitle] = useState("Test");

  const onDelete = () => {};

  return (
    <CardContainers direction="vertical">
      <Card
        type="inner"
        extra={<DeleteButton onClick={onDelete} color={colors.primary} />}
        title={
          <>
            <EditNameButton
              onClick={() => setEditName((prev) => !prev)}
              color={colors.primary}
            />
            {editName ? (
              <Input
                value={mealTitle}
                onChange={(e) => setMealTitle(e.target.value)}
                style={{ width: "80%" }}
              />
            ) : (
              mealTitle
            )}
          </>
        }
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
