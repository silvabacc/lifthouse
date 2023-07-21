import React, { useState } from "react";
import AuthPageHeader from "./components/AuthPageHeader";
import { AlreadyAUserButton, FormContainer } from "./components/FormStyles";
import { Typography } from "antd";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import {
  EmailField,
  ErrorMessage,
  FormButton,
  PasswordField,
} from "./components/Form";

const { Title } = Typography;

const SignUp: React.FC = () => {
  const [error, setError] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [firstPassword, setFirstPassword] = useState<string | null>("");
  const [secondPassword, setSecondPassword] = useState<string | null>("");
  const [disableButton, setDisableButton] = useState(false);
  const { signUp } = useAuthentication();
  const navigate = useNavigate();

  const alreadyAUserOnClick = () => navigate("/login");

  const formButtonOnClick = async () => {
    setDisableButton(true);

    if (email && firstPassword) {
      if (firstPassword !== secondPassword) {
        setError("Passwords do not match");
        setDisableButton(false);
        return;
      }

      const signUpResult = await signUp(email, firstPassword);
      if (signUpResult.success) {
        navigate("/verify", { state: { email: email } });
      } else {
        setError(signUpResult.message);
      }
    } else {
      setError("Please fill in the details below");
    }

    setDisableButton(false);
  };

  return (
    <>
      <AuthPageHeader />
      <FormContainer direction="vertical">
        <Title level={4}>Sign Up</Title>
        <ErrorMessage message={error} />
        <EmailField setEmail={setEmail} />
        <PasswordField setPassword={setFirstPassword} />
        <PasswordField setPassword={setSecondPassword} />
        <FormButton
          text={"Sign Up"}
          onClick={formButtonOnClick}
          disabled={disableButton}
        />
        <AlreadyAUserButton onClick={alreadyAUserOnClick} type="link">
          Already a user?
        </AlreadyAUserButton>
      </FormContainer>
    </>
  );
};

export default SignUp;
