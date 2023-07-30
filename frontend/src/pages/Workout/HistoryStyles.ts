import colors from "@frontend/theme/colors";
import { Space } from "antd";
import styled from "styled-components";

export const CarouselContainer = styled(Space)`
  width: 100%;
`;

export const HistoryStepsContainer = styled(Space)`
  width: 100%;
`;

export const CarouselButtons = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.light_grey};
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
