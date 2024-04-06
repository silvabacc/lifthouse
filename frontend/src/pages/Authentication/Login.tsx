import React, { useEffect, useState } from "react";
import AuthPageHeader from "./components/AuthPageHeader";

import { Alert, Button, Divider, Form, Input, Typography, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LockOutlined, GoogleOutlined } from "@ant-design/icons";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { AuthenticationContainer } from "./AuthenticationStyles";
import { EmailField, FormButton, FormWrapper } from "./components/Form";
import UpdateAlert from "../common/UpdateAlert";

const { Text } = Typography;

interface FieldType {
  email: string;
  password: string;
  required?: boolean;
}

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuthentication();
  const { state } = useLocation();

  const loggingInToastMessage = () => messageApi.loading("Logging in you...");

  //State from navigation
  //When the user creates an account, the state is set to accountCreated
  useEffect(() => {
    if (state?.accountCreated) {
      window.history.replaceState({}, document.title);
      messageApi.success("Account Created");
    }
  }, [state]);

  const onFinish = async (info: FieldType) => {
    setError("");

    const { email, password } = info;
    loggingInToastMessage();
    const loginResult = await login(email, password);
    if (loginResult.success) {
      navigate("/home");
    } else {
      messageApi.destroy();
      setError(loginResult.message);
    }
  };

  const signInWithGoogleOClick = () => {
    loggingInToastMessage();
    loginWithGoogle();
  };

  return (
    <AuthenticationContainer>
      {contextHolder}
      <AuthPageHeader />
      {error && (
        <Alert
          closable
          onClose={() => setError("")}
          style={{ marginBottom: 12 }}
          message={error}
          type="error"
        />
      )}
      <FormWrapper name="login-form" onFinish={onFinish}>
        <EmailField />
        <Form.Item>
          <a href="/signup">New User? Sign up here</a>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            visibilityToggle
          />
        </Form.Item>
        <Form.Item>
          <a href="/recovery">Forgot password</a>
        </Form.Item>
        <FormButton text={"Login"} />
        <Divider style={{ borderColor: "black" }}>
          <Text>Or Log in With</Text>
        </Divider>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button icon={<GoogleOutlined />} onClick={signInWithGoogleOClick}>
            Google
          </Button>
        </div>
      </FormWrapper>
    </AuthenticationContainer>
  );
};

export default Login;
