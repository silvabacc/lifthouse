import { Space, Typography } from "antd";
import React from "react";
import { MacroNumbersContainer, NumberText } from "./MacroNutrientsStyles";

const { Title } = Typography;

const MacroNutrients: React.FC = () => {
  return (
    <MacroNumbersContainer>
      <Space direction="vertical">
        <Title level={3}>Calories</Title>
        <NumberText>2345</NumberText>
      </Space>
      <Space direction="vertical">
        <Title level={3}> Protein</Title>
        <NumberText>165g</NumberText>
      </Space>
    </MacroNumbersContainer>
  );
};

export default MacroNutrients;
