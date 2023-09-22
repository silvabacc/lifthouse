import { Typography } from "antd";
import React from "react";
import { LoginHeader } from "../AuthenticationStyles";
import colors from "@frontend/theme/colors";

const { Text } = Typography;

const AuthPageHeader: React.FC = () => {
  return (
    <div style={{ justifyContent: "center", marginBottom: 16 }}>
      <LoginHeader>LiftHouse 🏋</LoginHeader>
      <Text style={{ color: colors.caption }}>
        Enjoy the journey, not the destination
      </Text>
    </div>
  );
};

export default AuthPageHeader;
