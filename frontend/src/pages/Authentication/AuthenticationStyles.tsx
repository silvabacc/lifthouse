import { Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

export const LoginHeader = styled(Title)`
  &.ant-typography {
    margin: 0px;
  }
`;

export const AuthenticationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
