import colors from "@frontend/theme/colors";
import { Space, Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

export const MacroNumbersContainer = styled(Space)`
  justify-content: space-evenly;
  margin-top: 32px;
  width: 100%;
`;

export const NumberText = styled.div`
  color: ${colors.primary};
  text-align: center;
  font-size: 20px;
  width: 100%;
`;
