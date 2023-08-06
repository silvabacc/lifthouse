import { Card, Input } from "antd";
import React from "react";
import { NutrientContainer, NutrientText } from "./MealTrackerStyles";

const AddEntry: React.FC = () => {
  const [mealTitle, setMealTitle] = React.useState("");

  const handleMealTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealTitle(e.target.value);
  };

  return (
    <Card
      type="inner"
      title={
        <Input
          onChange={handleMealTitle}
          placeholder="Meal Title..."
          value={mealTitle}
        />
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
  );
};

export default AddEntry;
