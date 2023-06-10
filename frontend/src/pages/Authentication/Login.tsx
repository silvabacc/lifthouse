import React, { useState } from "react";
import AuthPageHeader from "./components/AuthPageHeader";
import { FormContainer } from "./components/FormStyles";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import useAuthentication from "@frontend/hooks/useAuthentication";
import {
  EmailField,
  ErrorMessage,
  FormButton,
  LinkButton,
  PasswordField,
} from "./components/Form";

const { Title } = Typography;

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthentication();

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

  return (
    <>
      <AuthPageHeader />
      <FormContainer direction="vertical">
        <Title level={4}>Login</Title>
        <ErrorMessage message={error} />
        <EmailField setEmail={setEmail} />
        <LinkButton text={"New User? Sign up"} onClick={newUserOnClick} />
        <PasswordField setPassword={setPassword} />
        <LinkButton text={"Forgot password?"} />
        <FormButton
          text={"Login"}
          disabled={disableButton}
          onClick={formButtonOnClick}
        />
      </FormContainer>
    </>
  );
};

export default Login;
