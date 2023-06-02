import { Space } from "antd";
import React from "react";
import { LoginCaption, LoginHeader } from "./LoginStyles";

const Login: React.FC = () => {
  return (
    <>
      <Space size={0} direction="vertical">
        <LoginHeader>LiftHouse 🏋</LoginHeader>
        <LoginCaption>Enjoy the journey, not the destination</LoginCaption>
      </Space>
    </>
  );
};

export default Login;
