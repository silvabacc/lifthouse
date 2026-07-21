"use client";

import { useFetch } from "@/hooks/useFetch";
import { Meal } from "@/lib/supabase/db/types";
import { Skeleton, TabsProps, Tabs } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DateMover from "./components/dateMover";
import MealCard from "./components/mealCard";
import AddMeal from "./components/addMeal";
import dynamic from "next/dynamic";
import { PageAnimation } from "@/app/animations/pageAnimation";

const MacroNutrients = dynamic(() => import("./components/macroNutrients"), { ssr: false });

export default function MealsPage() {
  const [activeTab, setActivetab] = useState("1");
  const [selectedDay, setSelectedDay] = useState(() => dayjs());
  const [mealData, setMealData] = useState<Meal[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { fetch } = useFetch();

  const goToMealTab = () => {
    setActivetab("1");
    setRefreshToken((t) => t + 1);
  };

  const onDeleteCard = async (id: number) => {
    const deleteMealResponse = await fetch<{ success: boolean }>(
      `/api/meals/${id}`,
      { method: "DELETE" }
    );

    if (deleteMealResponse.success) {
      setMealData(mealData.filter((meal) => meal.id !== id));
    }
  };

  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    // Stale-response guard: without it, switching days quickly lets a slower
    // older request resolve last and overwrite the newer day's data.
    let stale = false;
    setMealData([]);
    setLoading(true);
    fetch<Meal[]>(`/api/meals?day=${selectedDay}`)
      .then((data) => {
        if (!stale) setMealData(data);
      })
      .finally(() => {
        if (!stale) setLoading(false);
      });
    return () => {
      stale = true;
    };
  }, [selectedDay, refreshToken, fetch]);

  const Cards = () => {
    return (
      <>
        <Skeleton loading={isLoading} />
        {mealData?.map((meal) => (
          <MealCard
            key={meal.id}
            data={meal}
            onDeleteCard={() => onDeleteCard(meal.id)}
          />
        ))}
      </>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Meals",
      children: Cards(),
    },
    {
      key: "2",
      label: "Add entry",
      children: <AddMeal goToMealTab={goToMealTab} selectedDay={selectedDay} />,
    },
  ];

  const calories = mealData?.reduce((acc, curr) => acc + curr.calorie, 0) || 0;
  const protein = mealData?.reduce((acc, curr) => acc + curr.protein, 0) || 0;
  const fat = mealData?.reduce((acc, curr) => acc + curr.fat, 0) || 0;
  const carbs = mealData?.reduce((acc, curr) => acc + curr.carbs, 0) || 0;

  return (
    <PageAnimation className="flex flex-col items-center rounded-xl bg-white h-full overflow-y-auto">
      <DateMover selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <MacroNutrients
        isLoading={isLoading}
        calories={calories}
        protein={protein}
        fat={fat}
        carbs={carbs}
      />
      <Tabs
        className="w-full max-w-2xl px-4"
        activeKey={activeTab}
        onChange={setActivetab}
        centered
        items={items}
      />
    </PageAnimation>
  );
}
