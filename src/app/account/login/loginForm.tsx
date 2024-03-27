"use client";

import { GoogleOutlined } from "@ant-design/icons";
import {
  EmailField,
  FormButton,
  FormWrapper,
  PasswordField,
} from "../components/form";
import { Alert, Button, Divider, Form, message } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";
import { signInWithEmail } from "./actions";
import { useRouter } from "next/navigation";
import { DemoText } from "@/app/components/demo/demo";

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

export default function LoginForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();

  const onSignInWithProivderClick = async (provider: Provider) => {
    messageApi.loading("Logging in...");

    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback/?next=lifthouse`,
      },
    });

    if (error) {
      messageApi.error(error.message);
    }
  };

  const onFinish = async (info: FieldType) => {
    setErrorMessage("");
    const { email, password } = info;
    messageApi.loading("Logging in...");

    const { error } = await signInWithEmail(email, password);

    if (error) {
      setErrorMessage(error);
      messageApi.destroy();
    } else {
      router.push("/lifthouse");
    }
  };

  return (
    <>
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
            onClick={() => onSignInWithProivderClick(Provider.Google)}
          >
            Google
          </Button>
        </div>
        <DemoText />
      </FormWrapper>
    </>
  );
}
