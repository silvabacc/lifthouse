import { Space, Typography } from "antd";
import React from "react";
import { MacroNumbersContainer, NumberText } from "./MacroNutrientsStyles";

const { Title } = Typography;

interface MacroNutrientsProps {
  calories: number;
  protein: number;
}

const MacroNutrients: React.FC<MacroNutrientsProps> = ({
  calories,
  protein,
}) => {
  return (
    <MacroNumbersContainer>
      <Space direction="vertical">
        <Title level={3}>Calories</Title>
        <NumberText>{calories}</NumberText>
      </Space>
      <Space direction="vertical">
        <Title level={3}> Protein</Title>
        <NumberText>{protein}</NumberText>
      </Space>
    </MacroNumbersContainer>
  );
};

export default MacroNutrients;
