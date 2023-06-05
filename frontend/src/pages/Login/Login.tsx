import { Input, Space, Typography } from "antd";
import React from "react";
import { FormContainer, LoginCaption, LoginHeader } from "./LoginStyles";

const { Title } = Typography;
import { BiUser } from "react-icons/bi";

const Login: React.FC = () => {
  return (
    <>
      <Space size={0} direction="vertical">
        <LoginHeader>LiftHouse 🏋</LoginHeader>
        <LoginCaption>Enjoy the journey, not the destination</LoginCaption>
      </Space>
      <FormContainer direction="vertical">
        <Title level={4}>Sign In</Title>
        <Input
          placeholder="Enter your email"
          prefix={<BiUser className="site-form-item-icon" />}
        />
        <Input.Password placeholder="Password" />
      </FormContainer>
    </>
  );
};

export default Login;
