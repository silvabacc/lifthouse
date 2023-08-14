import React, { useState } from "react";
import Header from "../common/Header";
import DateMover from "./DateMover";
import { Tabs, TabsProps } from "antd";
import MealTrackerCard from "./MealTrackerCard";
import MacroNutrients from "./MacroNutrients";
import AddEntry from "./AddEntry";
import dayjs from "dayjs";
import { useDatabase } from "@frontend/hooks/useDatabase";
import Loading from "../common/Loading";

const MealTracker: React.FC = () => {
  const [activeTab, setActivetab] = useState("1");
  const [selectedDay, setSelectedDay] = useState(() => dayjs());

  const { getMeals } = useDatabase();
  const { isLoading, data, refetch } = getMeals(selectedDay.toDate());

  const goToMealTab = () => {
    setActivetab("1");
    refetch();
  };

  const { deleteMeal } = useDatabase();

  const onDeleteCard = (id: string) => {
    deleteMeal(id);
    refetch();
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Meals`,
      children: data?.map((meal) => (
        <MealTrackerCard
          data={meal}
          onDeleteCard={() => onDeleteCard(meal.id)}
        />
      )),
    },
    {
      key: "2",
      label: `Add Entry`,
      children: <AddEntry goToMealTab={goToMealTab} />,
    },
  ];

  const calories = data?.reduce((acc, curr) => acc + curr.calories, 0) || 0;
  const protein = data?.reduce((acc, curr) => acc + curr.protein, 0) || 0;

  if (isLoading) return <Loading />;

  return (
    <>
      <Header title="Meal Tracker" />
      <DateMover selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <MacroNutrients calories={calories} protein={protein} />
      <Tabs
        activeKey={activeTab}
        onChange={setActivetab}
        centered
        items={items}
      />
    </>
  );
};

export default MealTracker;
