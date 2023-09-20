import colors from "@frontend/theme/colors";
import { Button, Space, Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

export const FormWrapper = styled.div`
  width: 350px;
  padding: 16px;
  background-color: ${colors.formBackgroundColor};
  border-radius: 8px;
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
  display: flex;
`;

export const Line = styled.hr`
  height: 1px;
  color: black;
  width: 100px;
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
