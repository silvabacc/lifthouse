import { Space } from "antd";
import React from "react";
import { LoginHeader, LoginCaption } from "./AuthPageHeaderStyles";

const AuthPageHeader: React.FC = () => {
  return (
    <Space size={0} direction="vertical">
      <LoginHeader>LiftHouse 🏋</LoginHeader>
      <LoginCaption>Enjoy the journey, not the destination</LoginCaption>
    </Space>
  );
};

export default AuthPageHeader;
