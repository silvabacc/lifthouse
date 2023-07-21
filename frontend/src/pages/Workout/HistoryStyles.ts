import { Card, Space } from "antd";
import styled from "styled-components";

export const HistoryTextBox = styled.div`
  border: 1px solid black;
`;

export const HistoryStepsContainer = styled(Space)`
  width: 100%;
`;

export const CarouselButtons = styled.div`
  display: flex;
  justify-content: center;
  background-color: #d3d3d3;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 4px;
`;

export const HistoryContainer = (height: number) => styled.div`
  display: flex;
  flex-direction: column;
  height: ${height}px;
`;
