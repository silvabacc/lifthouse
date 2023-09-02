import { Card, Input } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AddEntryButton,
  Errortext,
  NutrientLabelInput,
  NutrientLabelText,
  NutrientText,
  NutritionTableData,
} from "./MealTrackerStyles";
import { useDatabase } from "@frontend/hooks/useDatabase";

interface AddEntryProps {
  goToMealTab: () => void;
}

const AddEntry: React.FC<AddEntryProps> = ({ goToMealTab }) => {
  const [mealTitle, setMealTitle] = useState("");
  const [caloriesPer, setCaloriesPer] = useState(0);
  const [caloriesGrams, setCaloriesGrams] = useState(0);
  const [caloriesTotal, setCaloriesTotal] = useState(0);
  const [proteinPer, setProteinPer] = useState(0);
  const [proteinGrams, setProteinGrams] = useState(0);
  const [proteinTotal, setProteinTotal] = useState(0);
  const [error, setError] = useState(false);
  const { addMeal } = useDatabase();

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
  ];

  const proteinRow = [
    { state: proteinPer, set: setProteinPer },
    { state: proteinGrams, set: setProteinGrams },
  ];

  useEffect(() => {
    setCaloriesTotal(caloriesPer * (caloriesGrams / 100));
  }, [caloriesPer, caloriesGrams]);

  useEffect(() => {
    setProteinTotal(proteinGrams * (proteinPer / 100));
  }, [proteinPer, proteinGrams]);

  const handleCalorieTotalChange = (value: number) => {
    setCaloriesTotal(value);
    setCaloriesGrams(0);
    setCaloriesPer(0);
  };

  const handleProteinTotalChange = (value: number) => {
    setProteinTotal(value);
    setProteinGrams(0);
    setProteinPer(0);
  };

  const handleAdd = () => {
    if (mealTitle.length === 0) {
      setError(true);
    } else {
      addMeal(mealTitle, caloriesTotal, proteinTotal);
      goToMealTab();
      clearAll();
      setError(false);
    }
  };

  const clearAll = () => {
    setMealTitle("");
    setCaloriesPer(0);
    setCaloriesGrams(0);
    setCaloriesTotal(0);
    setProteinPer(0);
    setProteinGrams(0);
    setProteinTotal(0);
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
      <table style={{ width: "100%" }}>
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
                  onChange={(e) => handleNutritionInput(e as number, item.set)}
                />
              </NutritionTableData>
            ))}
            <NutritionTableData>
              <NutrientLabelInput
                value={caloriesTotal}
                onChange={(e) => handleCalorieTotalChange(e as number)}
              />
            </NutritionTableData>
          </tr>
          <tr>
            <td>
              <NutrientText>Protein</NutrientText>
            </td>
            {proteinRow.map((item, index) => (
              <NutritionTableData key={index}>
                <NutrientLabelInput
                  value={item.state}
                  onChange={(e) => handleNutritionInput(e as number, item.set)}
                />
              </NutritionTableData>
            ))}
            <NutritionTableData>
              <NutrientLabelInput
                value={proteinTotal}
                onChange={(e) => handleProteinTotalChange(e as number)}
              />
            </NutritionTableData>
          </tr>
        </tbody>
      </table>
      {error && <Errortext>Please make sure to have added a title</Errortext>}
      <AddEntryButton onClick={handleAdd} type="primary">
        Add
      </AddEntryButton>
    </Card>
  );
};

export default AddEntry;
