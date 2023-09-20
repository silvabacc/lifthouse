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
