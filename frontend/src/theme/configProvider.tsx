import { ConfigProvider as AntConfigProvider } from "antd";

export const ConfigProvider = ({ children }: any) => {
  return (
    <AntConfigProvider
      theme={{
        components: {
          Layout: { colorBgBody: "#FFF", colorBgHeader: "#FFF" },
        },
      }}
    >
      {children}
    </AntConfigProvider>
  );
};

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
