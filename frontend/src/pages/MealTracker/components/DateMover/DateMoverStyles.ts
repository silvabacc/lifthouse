import colors from "@frontend/theme/colors";
import styled from "styled-components";

export const DateMoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DateSquare = styled.div`
  background-color: ${colors.primary};
  color: white;
  border-radius: 6px;
  padding: 16px;
  width: 200px;
`;
