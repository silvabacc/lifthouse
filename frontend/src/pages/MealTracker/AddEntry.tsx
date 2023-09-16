import { Card, Input, Space } from "antd";
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
  const [grams, setGrams] = useState(0);
  const [caloriesTotal, setCaloriesTotal] = useState(0);
  const [proteinPer, setProteinPer] = useState(0);
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

  const caloriesRow = [{ state: caloriesPer, set: setCaloriesPer }];

  const proteinRow = [{ state: proteinPer, set: setProteinPer }];

  useEffect(() => {
    setCaloriesTotal(caloriesPer * (grams / 100));
  }, [caloriesPer, grams]);

  useEffect(() => {
    setProteinTotal(grams * (proteinPer / 100));
  }, [proteinPer, grams]);

  const handleCalorieTotalChange = (value: number) => {
    setCaloriesTotal(value);
    setCaloriesPer(0);
  };

  const handleProteinTotalChange = (value: number) => {
    setProteinTotal(value);
    setProteinPer(0);
  };

  const handleAdd = async () => {
    if (mealTitle.length === 0) {
      setError(true);
    } else {
      await addMeal(mealTitle, caloriesTotal, proteinTotal);
      goToMealTab();
      clearAll();
      setError(false);
    }
  };

  const clearAll = () => {
    setMealTitle("");
    setCaloriesPer(0);
    setCaloriesTotal(0);
    setGrams(0);
    setProteinPer(0);
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
            <td style={{ paddingBottom: 16 }}>
              <NutrientText>Grams of food</NutrientText>
            </td>
            <td style={{ paddingBottom: 16 }}>
              <NutrientLabelInput
                precision={1}
                onChange={(e) => setGrams(e as number)}
              />
            </td>
          </tr>
          <tr>
            <div />
            <NutrientLabelText>per 100g</NutrientLabelText>
            <NutrientLabelText>Total</NutrientLabelText>
          </tr>
          <tr>
            <td>
              <NutrientText>Calories</NutrientText>
            </td>
            {caloriesRow.map((item, index) => (
              <NutritionTableData key={index}>
                <NutrientLabelInput
                  precision={1}
                  value={item.state}
                  onChange={(e) => handleNutritionInput(e as number, item.set)}
                />
              </NutritionTableData>
            ))}
            <NutritionTableData>
              <NutrientLabelInput
                precision={1}
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
                  precision={1}
                  value={item.state}
                  onChange={(e) => handleNutritionInput(e as number, item.set)}
                />
              </NutritionTableData>
            ))}
            <NutritionTableData>
              <NutrientLabelInput
                precision={1}
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
