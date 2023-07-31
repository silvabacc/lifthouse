import React from "react";
import Header from "../common/Header";
import DateMover from "./components/DateMover";
import MacroNutrients from "./components/MacroNutrients";

const MealTracker: React.FC = () => {
  return (
    <>
      <Header title="Meal Tracker" />
      <DateMover />
      <MacroNutrients />
    </>
  );
};

export default MealTracker;
