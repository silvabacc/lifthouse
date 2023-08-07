import { Button, Card, Input } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AddEntryButton,
  NutrientContainer,
  NutrientLabelContainer,
  NutrientLabelInput,
  NutrientLabelText,
  NutrientText,
  NutritionTableData,
} from "./MealTrackerStyles";

const AddEntry: React.FC = () => {
  const [mealTitle, setMealTitle] = useState("");
  const [caloriesPer, setCaloriesPer] = useState(0);
  const [caloriesGrams, setCaloriesGrams] = useState(0);
  const [caloriesTotal, setCaloriesTotal] = useState(0);
  const [proteinPer, setProteinPer] = useState(0);
  const [proteinGrams, setProteinGrams] = useState(0);
  const [proteinTotal, setProteinTotal] = useState(0);

  const handleMealTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealTitle(e.target.value);
  };

  const handleNutritionInput = (
    value: number,
    setFn: Dispatch<SetStateAction<number>>
  ) => setFn(value);

  const caloriesRow = [
    { state: caloriesPer, set: setCaloriesPer },
    { state: caloriesGrams, set: setCaloriesGrams },
    { state: caloriesTotal, set: setCaloriesTotal },
  ];

  const proteinRow = [
    { state: proteinPer, set: setProteinPer },
    { state: proteinGrams, set: setProteinGrams },
    { state: proteinTotal, set: setProteinTotal },
  ];

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
      <table>
        <tbody>
          <tr>
            <th></th>
            <NutrientLabelText>per 100g</NutrientLabelText>
            <NutrientLabelText>grams</NutrientLabelText>
            <NutrientLabelText>Total</NutrientLabelText>
          </tr>
          <tr>
            <td>
              <NutrientText>Calories</NutrientText>
            </td>
            {caloriesRow.map((item, index) => (
              <NutritionTableData key={index}>
                <NutrientLabelInput
                  value={item.state}
                  onChange={(e) =>
                    handleNutritionInput(parseInt(e.target.value), item.set)
                  }
                />
              </NutritionTableData>
            ))}
          </tr>
          <tr>
            <td>
              <NutrientText>Protein</NutrientText>
            </td>
            {proteinRow.map((item, index) => (
              <NutritionTableData key={index}>
                <NutrientLabelInput
                  value={item.state}
                  onChange={(e) =>
                    handleNutritionInput(parseInt(e.target.value), item.set)
                  }
                />
              </NutritionTableData>
            ))}
          </tr>
        </tbody>
      </table>
      <AddEntryButton type="primary">Add</AddEntryButton>
    </Card>
  );
};

export default AddEntry;
