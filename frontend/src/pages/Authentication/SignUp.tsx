import React, { useState } from "react";
import AuthPageHeader from "./components/AuthPageHeader";
import { Alert, Form, Input, message } from "antd";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import {
  EmailField,
  FormWrapper,
  FormButton,
  PasswordField,
} from "./components/Form";
import { AuthenticationContainer } from "./AuthenticationStyles";
import { LockOutlined } from "@ant-design/icons";

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

  const loadingToastMessage = () => {
    messageApi.open({
      type: "loading",
      content: "Creating account...",
      duration: 1,
    });
  };

  const onFinish = async (info: FieldType) => {
    const { email, password } = info;
    setDisableButton(true);
    setAlert("");
    loadingToastMessage();

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
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>
        <FormButton text={"Sign Up"} disabled={disableButton} />
        <a type="link" href="/login">
          Already a user?
        </a>
      </FormWrapper>
    </AuthenticationContainer>
  );
};

export default SignUp;
