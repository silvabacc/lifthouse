import { Typography } from "antd";
import colors from "../../../theme/colors";
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
