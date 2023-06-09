import { Button, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
  AlreadyAUserButton,
  FormContainer,
  LinkButtonWrapper,
  FormButton,
  ErrorText,
} from "./AuthenticationStyles";
import { RiLockPasswordLine } from "react-icons/ri";
import { LoginOutlined } from "@ant-design/icons";
import { BiUser } from "react-icons/bi";
import useAuthentication from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import AuthPageHeader from "./components/AuthPageHeader";

enum AuthenticationPageState {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
}

const { Title } = Typography;

const Authentication: React.FC = () => {
  const [pageState, setPageState] = useState(AuthenticationPageState.LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [disableFormButton, setDisableFormButton] = useState(false);
  const navigate = useNavigate();
  const { login, signUp, auth } = useAuthentication();
  const { authLoading } = auth;

  const newUserOnClick = () => {
    setPageState(AuthenticationPageState.SIGNUP);
    setErrorMessage(null);
  };
  const alreadyAUserOnClick = () => setPageState(AuthenticationPageState.LOGIN);
  const formButtonOnClick = async () => {
    setDisableFormButton(true);

    if (pageState === AuthenticationPageState.LOGIN) {
      const loginResult = await login(email, password);
      if (loginResult.success) {
        navigate("/home");
      } else {
        setErrorMessage(loginResult.message);
      }
    } else {
      const signUpResult = await signUp(email, password);
      if (signUpResult.success) {
        navigate("/verify", { state: { email: email } });
      } else {
        setErrorMessage(signUpResult.message);
      }
    }

    setDisableFormButton(false);
  };

  const isLoginState = pageState === AuthenticationPageState.LOGIN;
  const formTitle =
    pageState === AuthenticationPageState.LOGIN ? "Login" : "Sign up";

  if (authLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <AuthPageHeader />
      <FormContainer direction="vertical">
        <Title level={4}>{formTitle}</Title>
        {errorMessage && (
          <ErrorText>{errorMessage}, please check your details again</ErrorText>
        )}
        <Input
          placeholder="Enter your email"
          prefix={<BiUser className="site-form-item-icon" />}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LinkButtonWrapper>
          <Button type="link" onClick={newUserOnClick}>
            {isLoginState ? "New User? Sign up" : ""}
          </Button>
        </LinkButtonWrapper>
        <Input.Password
          placeholder="Password"
          prefix={<RiLockPasswordLine />}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LinkButtonWrapper>
          <Button type="link">{isLoginState ? "Forgot password?" : ""}</Button>
        </LinkButtonWrapper>
        <FormButton
          size="large"
          type="primary"
          shape="round"
          onClick={formButtonOnClick}
          icon={<LoginOutlined />}
          disabled={disableFormButton}
        >
          {formTitle}
        </FormButton>
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
