import colors from "@frontend/theme/colors";
import { Space } from "antd";
import styled from "styled-components";

export const NutrientText = styled.div`
  margin: 0px 32px 32px 0px;
  color: ${colors.grey};
`;

export const NutrientContainer = styled(Space)`
  width: 100%;
  justify-content: space-between;
`;
