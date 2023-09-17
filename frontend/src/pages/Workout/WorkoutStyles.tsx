import colors from "@frontend/theme/colors";
import { Button, Space } from "antd";
import styled from "styled-components";

export const Container = styled(Space)`
  width: 100%;
  height: 100%;
  margin-bottom: 8px;
`;

export const EditButton = styled(Button)`
  margin-right: auto;
`;

export const RepContainer = styled(Space)`
  width: 100%;
  margin-top: 26px;
  margin-left: 10px;
`;

export const FinishWorkoutFooter = styled.div`
  border-top: 0.1px solid ${colors.grey};
  background: white;
  width: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
`;
