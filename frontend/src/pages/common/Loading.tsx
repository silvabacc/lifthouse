import React from "react";
import { Space, Spin } from "antd";
import styled from "styled-components";

const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <Spin size="large" />
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled(Space)`
  height: 100%;
  width: 100%;
  justify-content: center;
`;
