import { Button, Space, Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

export const FormContainer = styled(Space)`
  height: 70%;
  width: 100%;
  justify-content: center;
`;

export const FormButtonStyle = styled(Button)`
  width: 100%;
`;

export const LinkButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const AlreadyAUserButton = styled(Button)`
  width: 100%;
  justify-content: center;
`;

export const ErrorText = styled(Text)`
  color: red;
`;
