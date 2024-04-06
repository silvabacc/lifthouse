import { Typography } from "antd";
import React from "react";
import { LoginHeader } from "../AuthenticationStyles";
import colors from "@frontend/theme/colors";
import UpdateAlert from "@frontend/pages/common/UpdateAlert";

const { Text } = Typography;

const AuthPageHeader: React.FC = () => {
  return (
    <div>
      <LoginHeader>LiftHouse 🏋</LoginHeader>
      <Text style={{ color: colors.caption }}>
        Enjoy the journey, not the destination
      </Text>
      <UpdateAlert width={350} />
    </div>
  );
};

export default AuthPageHeader;
