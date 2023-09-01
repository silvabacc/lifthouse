import colors from "@frontend/theme/colors";
import { Button, Input, InputNumber, Space } from "antd";
import styled from "styled-components";

export const NutrientText = styled.div`
  color: ${colors.grey};
  margin-right: 10px;
`;

export const NutritionTableData = styled.td`
  padding: 6px;
`;

export const NutrientLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NutrientLabelInput = styled(InputNumber)`
  width: 100%;
`;

export const NutrientLabelText = styled.td`
  font-size: 12px;
  text-align: center;
`;

export const NutrientContainer = styled(Space)`
  width: 100%;
  justify-content: space-between;
`;

export const AddEntryButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

export const Errortext = styled.p`
  color: ${colors.warning};
  text-align: center;
  margin-top: 16px;
`;