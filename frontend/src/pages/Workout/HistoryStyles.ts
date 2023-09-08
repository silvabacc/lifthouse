import colors from "@frontend/theme/colors";
import { Button, InputNumber, Space } from "antd";
import styled from "styled-components";

export const CarouselContainer = styled(Space)`
  width: 100%;
`;

export const CarouselButtons = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.medium_grey};
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

export const HistoryTitleContainer = styled(Space)`
  width: 100%;
  justify-content: space-between;
`;

export const DeleteButton = styled(Button)`
  color: ${colors.delete};
`;

export const EditButton = styled(Button)`
  color: ${colors.primary};
`;

export const HistoryInputNumber = styled(InputNumber)`
  ::placeholder {
    color: "red";
  }
`;
