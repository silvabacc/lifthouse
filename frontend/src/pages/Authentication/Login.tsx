import React, { useState } from "react";
import AuthPageHeader from "./components/AuthPageHeader";
import {
  FormContainer,
  Line,
  LoginWithContainer,
  LoginWithText,
  ProvidersConainer,
} from "./components/FormStyles";
import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import useAuthentication from "@frontend/hooks/useAuthentication";
import {
  EmailField,
  ErrorMessage,
  FormButton,
  LinkButton,
  PasswordField,
} from "./components/Form";
import { GoogleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuthentication();

  const newUserOnClick = () => navigate("/signup");

  const formButtonOnClick = async () => {
    setDisableButton(true);

    if (email && password) {
      const loginResult = await login(email, password);
      if (loginResult.success) {
        navigate("/home");
      } else {
        setError(loginResult.message);
      }
    }

    setDisableButton(false);
  };

  const forgotPasswordOnClick = () => {
    navigate("/recovery");
  };

  const signInWithGoogleOClick = () => {
    loginWithGoogle();
  };

  return (
    <>
      <AuthPageHeader />
      <FormContainer direction="vertical">
        <Title level={4}>Login</Title>
        <ErrorMessage message={error} />
        <EmailField setEmail={setEmail} />
        <LinkButton text={"New User? Sign up"} onClick={newUserOnClick} />
        <PasswordField setPassword={setPassword} />
        <LinkButton text={"Forgot password?"} onClick={forgotPasswordOnClick} />
        <FormButton
          text={"Login"}
          disabled={disableButton}
          onClick={formButtonOnClick}
        />
        <LoginWithContainer>
          <Line />
          <LoginWithText>Or Log in With</LoginWithText>
          <Line />
        </LoginWithContainer>
        <ProvidersConainer>
          <Button icon={<GoogleOutlined />} onClick={signInWithGoogleOClick}>
            Google
          </Button>
        </ProvidersConainer>
      </FormContainer>
    </>
  );
};

export default Login;
