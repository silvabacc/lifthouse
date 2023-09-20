import React, { useState } from "react";
import AuthPageHeader from "./components/AuthPageHeader";
import { Alert, message } from "antd";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import {
  EmailField,
  FormWrapper,
  FormButton,
  PasswordField,
  ConfirmPasswordField,
} from "./components/Form";
import { AuthenticationContainer } from "./AuthenticationStyles";

interface FieldType {
  email: string;
  password: string;
  confirm: string;
  required?: boolean;
}

const SignUp: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [alert, setAlert] = useState<string | null>("");
  const [disableButton, setDisableButton] = useState(false);
  const { signUp } = useAuthentication();
  const navigate = useNavigate();

  const onFinish = async (info: FieldType) => {
    const { email, password } = info;
    setDisableButton(true);
    setAlert("");
    messageApi.loading("Creating account...");

    const signUpResult = await signUp(email, password);
    if (signUpResult.success) {
      navigate("/login", { state: { accountCreated: true } });
    } else {
      setAlert(signUpResult.message);
    }

    messageApi.destroy();
    setDisableButton(false);
  };

  return (
    <AuthenticationContainer>
      {contextHolder}
      <AuthPageHeader />
      {alert && (
        <Alert
          closable
          onClose={() => setAlert("")}
          style={{ marginBottom: 12 }}
          message={alert}
          type="error"
        />
      )}
      <FormWrapper title="Sign up" onFinish={onFinish}>
        <EmailField />
        <PasswordField />
        <ConfirmPasswordField />
        <FormButton text={"Sign Up"} disabled={disableButton} />
        <a type="link" href="/login">
          Already a user?
        </a>
      </FormWrapper>
    </AuthenticationContainer>
  );
};

export default SignUp;
