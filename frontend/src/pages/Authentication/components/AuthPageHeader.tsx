import { Space, Typography } from "antd";
import React from "react";
import { LoginHeader } from "../AuthenticationStyles";
import colors from "@frontend/theme/colors";

const { Text } = Typography;

const AuthPageHeader: React.FC = () => {
  return (
    <Space
      style={{ justifyContent: "center", marginBottom: 16 }}
      size={0}
      direction="vertical"
    >
      <LoginHeader>LiftHouse 🏋</LoginHeader>
      <Text style={{ color: colors.caption }}>
        Enjoy the journey, not the destination
      </Text>
    </Space>
  );
};

export default AuthPageHeader;
