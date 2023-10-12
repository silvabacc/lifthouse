import { Alert, Button, Card, Input } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NutrientText } from "../../MealTrackerStyles";
import {
  AddLabelText,
  AddMealInput,
  AddMealTableData,
} from "./AddMealCardStyles";
import { useMealTracker } from "../../useMealTracker";

interface AddEntryProps {
  goToMealTab: () => void;
}

const AddMealCard: React.FC<AddEntryProps> = ({ goToMealTab }) => {
  const [mealTitle, setMealTitle] = useState("");
  const [caloriesPer, setCaloriesPer] = useState(0);
  const [grams, setGrams] = useState(0);
  const [caloriesTotal, setCaloriesTotal] = useState(0);
  const [proteinPer, setProteinPer] = useState(0);
  const [proteinTotal, setProteinTotal] = useState(0);
  const [error, setError] = useState(false);
  const { addMeal } = useMealTracker();

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
      style={{ maxWidth: 500, margin: "auto", marginBottom: 16 }}
      type="inner"
      title={
        <Input
          type="text"
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
              <AddMealInput
                inputMode="decimal"
                precision={1}
                value={grams}
                onChange={(e) => setGrams(e as number)}
              />
            </td>
          </tr>
          <tr>
            <div />
            <AddLabelText>per 100g</AddLabelText>
            <AddLabelText>Total</AddLabelText>
          </tr>
          <tr>
            <td>
              <NutrientText>Calories</NutrientText>
            </td>
            {caloriesRow.map((item, index) => (
              <AddMealTableData key={index}>
                <AddMealInput
                  inputMode="decimal"
                  precision={1}
                  value={item.state}
                  onChange={(e) => handleNutritionInput(e as number, item.set)}
                />
              </AddMealTableData>
            ))}
            <AddMealTableData>
              <AddMealInput
                inputMode="decimal"
                precision={1}
                value={caloriesTotal}
                onChange={(e) => handleCalorieTotalChange(e as number)}
              />
            </AddMealTableData>
          </tr>
          <tr>
            <td>
              <NutrientText>Protein</NutrientText>
            </td>
            {proteinRow.map((item, index) => (
              <AddMealTableData key={index}>
                <AddMealInput
                  inputMode="decimal"
                  precision={1}
                  value={item.state}
                  onChange={(e) => handleNutritionInput(e as number, item.set)}
                />
              </AddMealTableData>
            ))}
            <AddMealTableData>
              <AddMealInput
                inputMode="decimal"
                precision={1}
                value={proteinTotal}
                onChange={(e) => handleProteinTotalChange(e as number)}
              />
            </AddMealTableData>
          </tr>
        </tbody>
      </table>
      {error && (
        <Alert
          style={{ marginTop: 16 }}
          message="Please add a title"
          type="error"
          showIcon
        />
      )}
      <Button
        style={{ width: "100%", marginTop: 16 }}
        onClick={handleAdd}
        type="primary"
      >
        Add
      </Button>
    </Card>
  );
};

export default AddMealCard;
