import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Space } from "antd";

export const BackNavigationContainer = styled.div``;

export const BackNavigationIcon = styled(ArrowLeftOutlined)`
  margin-right: 8px;
  margin-bottom: 12px;
`;

export const HeadContainer = styled(Space)`
  width: 100%;
  justify-content: space-between;
`;
