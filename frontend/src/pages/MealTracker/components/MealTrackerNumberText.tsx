import React from "react";

interface MealTrackerNumberTextProps {
  value: number;
}

const MealTrackerNumberText: React.FC<MealTrackerNumberTextProps> = ({
  value,
}) => <p>{value % 1 !== 0 ? value.toFixed(1) : value}</p>;

export default MealTrackerNumberText;
