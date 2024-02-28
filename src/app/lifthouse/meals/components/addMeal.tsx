import { useFetch } from "@/app/hooks/useFetch";
import { Card, Input, Alert, Button, InputNumber } from "antd";
import { useState, useRef, Dispatch, SetStateAction, useEffect } from "react";

type AddMealProps = {
  goToMealTab: () => void;
};
export default function AddMeal({ goToMealTab }: AddMealProps) {
  const { fetch } = useFetch();
  const [mealTitle, setMealTitle] = useState("");
  const [caloriesPer, setCaloriesPer] = useState<number>();
  const [grams, setGrams] = useState<number>();
  const [caloriesTotal, setCaloriesTotal] = useState<number>();
  const [proteinPer, setProteinPer] = useState<number>();
  const [proteinTotal, setProteinTotal] = useState<number>();
  const [carbsPer, setCarbsPer] = useState<number>();
  const [carbsTotal, setCarbsTotal] = useState<number>();
  const [fatsPer, setFatsPer] = useState<number>();
  const [fatsTotal, setFatsTotal] = useState<number>();
  const [error, setError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const addMeal = async (
    mealTitle: string,
    nutrients: { calories: number; protein: number; fat: number; carbs: number }
  ) => {
    const response = await fetch("/api/meals", {
      method: "POST",
      body: JSON.stringify({
        mealTitle: mealTitle,
        ...nutrients,
      }),
    });
  };

  const handleMealTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealTitle(e.target.value);
  };

  const handleNutritionInput = (
    value: number,
    setFn: Dispatch<SetStateAction<number | undefined>>
  ) => setFn(value);

  const caloriesRow = [{ state: caloriesPer, set: setCaloriesPer }];

  const proteinRow = [{ state: proteinPer, set: setProteinPer }];

  const carbsRow = [{ state: carbsPer, set: setCarbsPer }];

  const fatRow = [{ state: fatsPer, set: setFatsPer }];

  useEffect(() => {
    window.addEventListener("resize", () => {
      scrollToCard();
    });
  }, []);

  //Refactor this
  useEffect(() => {
    if (!grams || !caloriesPer) return;
    setCaloriesTotal(caloriesPer * (grams / 100));
  }, [caloriesPer, grams]);

  useEffect(() => {
    if (!grams || !proteinPer) return;
    setProteinTotal(grams * (proteinPer / 100));
  }, [proteinPer, grams]);

  useEffect(() => {
    if (!grams || !carbsPer) return;
    setCarbsTotal(grams * (carbsPer / 100));
  }, [carbsPer, grams]);

  useEffect(() => {
    if (!grams || !fatsPer) return;
    setFatsTotal(grams * (fatsPer / 100));
  }, [fatsPer, grams]);

  const handleCalorieTotalChange = (value: number) => {
    setCaloriesTotal(value);
    setCaloriesPer(0);
  };

  const handleProteinTotalChange = (value: number) => {
    setProteinTotal(value);
    setProteinPer(0);
  };

  const handleFatTotalChange = (value: number) => {
    setFatsTotal(value);
    setFatsPer(0);
  };

  const handleCarbTotalChange = (value: number) => {
    setCarbsPer(value);
    setCaloriesTotal(0);
  };

  const handleAdd = async () => {
    if (mealTitle.length === 0) {
      setError(true);
    } else {
      await addMeal(mealTitle, {
        calories: caloriesTotal || 0,
        protein: proteinTotal || 0,
        carbs: carbsTotal || 0,
        fat: fatsTotal || 0,
      });
      goToMealTab();
      clearAll();
      setError(false);
    }
  };

  const clearAll = () => {
    setMealTitle("");
    setCaloriesPer(undefined);
    setCaloriesTotal(undefined);
    setGrams(undefined);
    setProteinPer(undefined);
    setProteinTotal(undefined);
    setCarbsPer(undefined);
    setCarbsTotal(undefined);
    setFatsPer(undefined);
    setFatsTotal(undefined);
  };

  const scrollToCard = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card
      ref={cardRef}
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
              <p className="text-slate-400">Grams of food</p>
            </td>
            <td style={{ paddingBottom: 16 }}>
              <InputNumber
                placeholder="0"
                inputMode="decimal"
                precision={1}
                value={grams}
                onChange={(e) => setGrams(e as number)}
              />
            </td>
          </tr>
          <tr>
            <td />
            <td>per 100g</td>
            <td>Total</td>
          </tr>
          <tr>
            <td>
              <p className="text-slate-400">Calories</p>
            </td>
            {caloriesRow.map((item, index) => (
              <td key={index}>
                <InputNumber
                  placeholder="0"
                  inputMode="decimal"
                  precision={1}
                  value={item.state}
                  onChange={(e) => handleNutritionInput(e as number, item.set)}
                />
              </td>
            ))}
            <td>
              <InputNumber
                placeholder="0"
                inputMode="decimal"
                precision={1}
                value={caloriesTotal}
                onChange={(e) => handleCalorieTotalChange(e as number)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className="text-slate-400">Fat</p>
            </td>
            {fatRow.map((item, index) => (
              <td key={index}>
                <InputNumber
                  placeholder="0"
                  inputMode="decimal"
                  precision={1}
                  value={item.state}
                  onChange={(e) => handleNutritionInput(e as number, item.set)}
                />
              </td>
            ))}
            <td>
              <InputNumber
                placeholder="0"
                inputMode="decimal"
                precision={1}
                value={fatsTotal}
                onChange={(e) => handleFatTotalChange(e as number)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className="text-slate-400">Carbs</p>
            </td>
            {carbsRow.map((item, index) => (
              <td key={index}>
                <InputNumber
                  placeholder="0"
                  inputMode="decimal"
                  precision={1}
                  value={item.state}
                  onChange={(e) => handleNutritionInput(e as number, item.set)}
                />
              </td>
            ))}
            <td>
              <InputNumber
                placeholder="0"
                inputMode="decimal"
                precision={1}
                value={carbsTotal}
                onChange={(e) => handleCarbTotalChange(e as number)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <p className="text-slate-400">Protein</p>
            </td>
            {proteinRow.map((item, index) => (
              <td key={index}>
                <InputNumber
                  placeholder="0"
                  inputMode="decimal"
                  precision={1}
                  value={item.state}
                  onChange={(e) => handleNutritionInput(e as number, item.set)}
                />
              </td>
            ))}
            <td>
              <InputNumber
                placeholder="0"
                inputMode="decimal"
                precision={1}
                value={proteinTotal}
                onChange={(e) => handleProteinTotalChange(e as number)}
              />
            </td>
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
}
