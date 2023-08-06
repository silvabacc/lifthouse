import colors from "@frontend/theme/colors";
import { Typography } from "antd";
import styled from "styled-components";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export const DateMoverContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

export const DateSquare = styled.div`
  background-color: ${colors.primary};
  border-radius: 5px;
  color: white;
  height: 50%;
  padding: 10px 32px 10px 32px;
`;

export const DateLeftArrowButton = styled(AiOutlineArrowLeft)`
  margin: 32px;
`;

export const DateRightArrowButton = styled(AiOutlineArrowRight)`
  margin: 32px;
`;
