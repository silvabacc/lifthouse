import React, { useState } from "react";
import Header from "../common/Header";
import DateMover from "./components/DateMover/DateMover";
import { Tabs, TabsProps } from "antd";
import MealTrackerCard from "./components/MealTrackerCard/MealTrackerCard";
import MacroNutrients from "./components/MacroNutrients/MacroNutrients";
import dayjs from "dayjs";
import { useDatabase } from "@frontend/hooks/useDatabase";
import Loading from "../common/Loading";
import { MealTrackerContainer } from "./MealTrackerStyles";
import AddMealCard from "./components/AddMealCard/AddMealCard";

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

  const Cards = () => {
    return data?.map((meal) => (
      <MealTrackerCard
        key={meal.id}
        data={meal}
        onDeleteCard={() => onDeleteCard(meal.id)}
      />
    ));
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Meals`,
      children: Cards(),
    },
    {
      key: "2",
      label: `Add Entry`,
      children: <AddMealCard goToMealTab={goToMealTab} />,
    },
  ];

  const calories = data?.reduce((acc, curr) => acc + curr.calories, 0) || 0;
  const protein = data?.reduce((acc, curr) => acc + curr.protein, 0) || 0;

  if (isLoading) return <Loading />;

  return (
    <>
      <Header title="Meal Tracker" />
      <MealTrackerContainer>
        <DateMover selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <MacroNutrients calories={calories} protein={protein} />
        <Tabs
          style={{ width: "100%" }}
          activeKey={activeTab}
          onChange={setActivetab}
          centered
          items={items}
        />
      </MealTrackerContainer>
    </>
  );
};

export default MealTracker;
