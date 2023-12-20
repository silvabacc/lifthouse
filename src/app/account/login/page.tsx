"use client";

import { useRouter } from "next/navigation";
import { GoogleOutlined } from "@ant-design/icons";
import {
  EmailField,
  FormButton,
  FormWrapper,
  PasswordField,
} from "./components/form";
import { Alert, Button, Divider, Form, message } from "antd";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Link from "next/link";

enum Provider {
  Google = "google",
}

/**
 * Defined by the Form elements based on 'name' property
 */
type FieldType = {
  email: string;
  password: string;
  required?: boolean;
};

export default function Login() {
  const supabase = createClientComponentClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [form] = Form.useForm();
  const router = useRouter();

  const signInWithProvider = async (provider: Provider) => {
    messageApi.loading("Logging in...");

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/auth/callback` },
    });

    if (error) {
      messageApi.error(error.message);
    }
  };

  const onFinish = async (info: FieldType) => {
    setErrorMessage("");
    const { email, password } = info;
    messageApi.loading("Logging in...");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(`${location.origin}/auth/login`, {
      method: "POST",
      body: formData,
    });

    if (response.status === 400) {
      const data = await response.json();
      setErrorMessage(data.error);
      messageApi.destroy();
    }

    router.push("/");
  };

  return (
    <div>
      {contextHolder}
      <FormWrapper onFinish={onFinish}>
        {errorMessage && (
          <Alert
            closable
            onClose={() => setErrorMessage("")}
            style={{ marginBottom: 12 }}
            message={errorMessage}
            type="error"
          />
        )}
        <EmailField />
        <Form.Item>
          <Link href="/account/signup">New User? Sign up here</Link>
        </Form.Item>
        <PasswordField />
        <Form.Item>
          <Link href="/account/recovery">Forgot password</Link>
        </Form.Item>
        <FormButton text={"Login"} />
        <Divider style={{ borderColor: "black" }}>
          <span>Or Log in With</span>
        </Divider>
        <div className="flex justify-center">
          <Button
            icon={<GoogleOutlined />}
            onClick={() => signInWithProvider(Provider.Google)}
          >
            Google
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
}
