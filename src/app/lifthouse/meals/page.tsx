"use client";

import { useFetch } from "@/app/hooks/useFetch";
import { Meal } from "@/lib/supabase/db/types";
import { Skeleton, TabsProps, Tabs } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DateMover from "./components/dateMover";

export default function MealsPage() {
  const [activeTab, setActivetab] = useState("1");
  const [selectedDay, setSelectedDay] = useState(() => dayjs());
  const [mealData, setMealData] = useState<Meal[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { fetch } = useFetch();

  const goToMealTab = () => {
    setActivetab("1");
  };

  const onDeleteCard = async (id: string) => {};

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const data = await fetch(`/api/meals?day=${selectedDay}`);
      setMealData(data);
      setLoading(false);
    };
    fetchMeals();
  }, [selectedDay]);

  // const Cards = () => {
  //   return (
  //     <>
  //       <Skeleton loading={isLoading} />
  //       {mealData?.map((meal) => (
  //         <MealTrackerCard
  //           key={meal.id}
  //           data={meal}
  //           onDeleteCard={() => onDeleteCard(meal.id)}
  //         />
  //       ))}
  //     </>
  //   );
  // };

  const items: TabsProps["items"] = [
    // {
    //   key: "1",
    //   label: `Meals`,
    //   children: Cards(),
    // },
    // {
    //   key: "2",
    //   label: `Add Entry`,
    //   children: <AddMealCard goToMealTab={goToMealTab} />,
    // },
  ];

  const calories = mealData?.reduce((acc, curr) => acc + curr.calories, 0) || 0;
  const protein = mealData?.reduce((acc, curr) => acc + curr.protein, 0) || 0;

  return (
    <div className="flex flex-col items-center">
      <DateMover selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      {/* <MacroNutrients calories={calories} protein={protein} />
      <Tabs
        style={{ width: "100%" }}
        activeKey={activeTab}
        onChange={setActivetab}
        centered
        items={items}
      /> */}
    </div>
  );
}
