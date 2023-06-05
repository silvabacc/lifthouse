import { Input, Space, Typography } from "antd";
import styled from "styled-components";
import colors from "../../theme/colors";

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
