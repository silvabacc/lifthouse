import React from "react";
import Header from "../common/Header";
import DateMover from "./DateMover";
import { Tabs, TabsProps } from "antd";
import MealTrackerCards from "./MealTrackerCards";
import MacroNutrients from "./MacroNutrients";
import AddEntry from "./AddEntry";

const MealTracker: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Meals`,
      children: <MealTrackerCards />,
    },
    {
      key: "2",
      label: `Add Entry`,
      children: <AddEntry />,
    },
  ];

  return (
    <>
      <Header title="Meal Tracker" />
      <DateMover />
      <MacroNutrients />
      <Tabs centered items={items} />
    </>
  );
};

export default MealTracker;
