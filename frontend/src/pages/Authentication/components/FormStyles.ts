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

export const LoginWithContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Line = styled.hr`
  height: 1px;
  color: black;
  flex: 1;
  background-color: black;
`;

export const LoginWithText = styled(Text)`
  margin: auto;
  padding-left: 16px;
  padding-right: 16px;
`;

export const ProvidersConainer = styled(Space)`
  margin-top: 16px;
  justify-content: center;
  width: 100%;
`;
