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
    refetch();
    setActivetab("1");
  };

  const { deleteMeal } = useDatabase();

  const onDeleteCard = async (id: string) => {
    await deleteMeal(id);
    refetch();
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Meals`,
      children: data?.length ? (
        data.map((meal) => (
          <MealTrackerCard
            key={meal.id}
            data={meal}
            onDeleteCard={() => onDeleteCard(meal.id)}
          />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No meals recorded today</p>
      ),
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
