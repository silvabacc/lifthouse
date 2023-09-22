import { ConfigProvider as AntConfigProvider } from "antd";
import styled from "styled-components";

export const DailyWeighInConfigProvider = ({ children }: any) => {
  return (
    <AntConfigProvider
      theme={{
        components: {
          Calendar: {
            miniContentHeight: window.innerHeight / 2.3,
          },
        },
      }}
    >
      {children}
    </AntConfigProvider>
  );
};

export const DailyWeighInContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
