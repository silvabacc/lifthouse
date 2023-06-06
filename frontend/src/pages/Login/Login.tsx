import { Button, Input, Space, Typography } from "antd";
import React from "react";
import {
  FormContainer,
  LinkButtonWrapper,
  LoginButton,
  LoginCaption,
  LoginHeader,
} from "./LoginStyles";

const { Title, Text } = Typography;
import { BiUser } from "react-icons/bi";
import { LoginOutlined } from "@ant-design/icons";
import { RiLockPasswordLine } from "react-icons/ri";

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
        <LinkButtonWrapper>
          <Button type="link">New User? Sign Up</Button>
        </LinkButtonWrapper>
        <Input.Password
          placeholder="Password"
          prefix={<RiLockPasswordLine />}
        />
        <LinkButtonWrapper>
          <Button type="link">Forgot password?</Button>
        </LinkButtonWrapper>
        <LoginButton
          size="large"
          type="primary"
          shape="round"
          icon={<LoginOutlined />}
        >
          Sign In
        </LoginButton>
      </FormContainer>
    </>
  );
};

export default Login;
