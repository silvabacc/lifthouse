import { Button, Space, Typography } from "antd";
import colors from "../../theme/colors";
import styled from "styled-components";

const { Title, Text } = Typography;

export const LoginHeader = styled(Title)`
  &.ant-typography {
    margin: 0px;
  }
`;

export const LoginCaption = styled(Text)`
  color: ${colors.grey};
`;

export const FormContainer = styled(Space)`
  height: 70%;
  width: 100%;
  justify-content: center;
`;

export const LoginButton = styled(Button)`
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
