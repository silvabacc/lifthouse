import { Button, Input, Space, Typography } from "antd";
import React, { useState } from "react";
import {
  AlreadyAUserButton,
  FormContainer,
  LinkButtonWrapper,
  LoginButton,
  LoginCaption,
  LoginHeader,
} from "./AuthenticationStyles";
import { RiLockPasswordLine } from "react-icons/ri";
import { LoginOutlined } from "@ant-design/icons";
import { BiUser } from "react-icons/bi";

enum AuthenticationPageState {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
}

const { Title } = Typography;

const Authentication: React.FC = () => {
  const [pageState, setPageState] = useState(AuthenticationPageState.LOGIN);

  const newUserOnClick = () => setPageState(AuthenticationPageState.SIGNUP);
  const alreadyAUserOnClick = () => setPageState(AuthenticationPageState.LOGIN);

  const isLoginState = pageState === AuthenticationPageState.LOGIN;
  const formTitle =
    pageState === AuthenticationPageState.LOGIN ? "Login" : "Sign up";

  return (
    <>
      <Space size={0} direction="vertical">
        <LoginHeader>LiftHouse 🏋</LoginHeader>
        <LoginCaption>Enjoy the journey, not the destination</LoginCaption>
      </Space>
      <FormContainer direction="vertical">
        <Title level={4}>{formTitle}</Title>
        <Input
          placeholder="Enter your email"
          prefix={<BiUser className="site-form-item-icon" />}
        />
        <LinkButtonWrapper>
          <Button type="link" onClick={newUserOnClick}>
            {isLoginState ? "New User? Sign up" : ""}
          </Button>
        </LinkButtonWrapper>
        <Input.Password
          placeholder="Password"
          prefix={<RiLockPasswordLine />}
        />
        <LinkButtonWrapper>
          <Button type="link">{isLoginState ? "Forgot password?" : ""}</Button>
        </LinkButtonWrapper>
        <LoginButton
          size="large"
          type="primary"
          shape="round"
          icon={<LoginOutlined />}
        >
          {formTitle}
        </LoginButton>
        {!isLoginState && (
          <AlreadyAUserButton onClick={alreadyAUserOnClick} type="link">
            Already a user?
          </AlreadyAUserButton>
        )}
      </FormContainer>
    </>
  );
};

export default Authentication;
