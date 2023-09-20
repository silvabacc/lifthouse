import React, { useEffect, useState } from "react";
import AuthPageHeader from "./components/AuthPageHeader";
import { FormWrapper, LoginWithText } from "./components/FormStyles";
import { Alert, Button, Divider, Form, Input, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { GoogleOutlined } from "@ant-design/icons";
import { AuthenticationContainer } from "./AuthenticationStyles";

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

  const loggingInToastMessage = () => {
    messageApi.open({
      type: "loading",
      content: "Logging in you...",
      duration: 1,
    });
  };

  const accountCreatedToastMessage = () => {
    messageApi.open({
      type: "success",
      content: "Account Created",
      duration: 1,
    });
  };

  //State from navigation
  //When the user creates an account, the state is set to accountCreated
  useEffect(() => {
    if (state?.accountCreated) {
      accountCreatedToastMessage();
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
      <FormWrapper>
        <Form name="login-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please input your email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <a href="/recovery">New User? Sign up here</a>
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
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ borderColor: "black" }}>
          <LoginWithText>Or Log in With</LoginWithText>
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
