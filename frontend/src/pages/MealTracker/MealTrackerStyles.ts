import colors from "@frontend/theme/colors";
import { Button, Input, Space } from "antd";
import styled from "styled-components";

export const NutrientText = styled.div`
  color: ${colors.grey};
`;

export const NutritionTableData = styled.td`
  padding: 16px;
`;

export const NutrientLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NutrientLabelInput = styled(Input)`
  text-align: center;
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
`;
