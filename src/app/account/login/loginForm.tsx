"use client";

import { GoogleOutlined } from "@ant-design/icons";
import {
  EmailField,
  FormButton,
  FormWrapper,
  PasswordField,
} from "../components/form";
import { Alert, App, Button, Divider } from "antd";
import { useState } from "react";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";
import { signInWithEmail } from "./actions";
import { useRouter } from "next/navigation";
import { DemoText } from "@/app/components/demo/demo";
import { redirectToHome } from "@/lib/utils";

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
  const { message: messageApi } = App.useApp();
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
      redirectToHome(router);
    }
  };

  return (
    <>
      <FormWrapper onFinish={onFinish}>
        {errorMessage && (
          <Alert
            closable={{ onClose: () => setErrorMessage("") }}
            style={{ marginBottom: 12 }}
            title={errorMessage}
            type="error"
          />
        )}
        <EmailField />
        <PasswordField />
        <div className="-mt-2 mb-4 flex justify-end">
          <Link className="text-sm" href="/account/recovery">
            Forgot password?
          </Link>
        </div>
        <FormButton text={"Log in"} />
        <Divider plain>
          <span className="text-xs text-gray-400">or continue with</span>
        </Divider>
        <Button
          block
          size="large"
          icon={<GoogleOutlined />}
          onClick={() => onSignInWithProivderClick(Provider.Google)}
        >
          Google
        </Button>
        <p className="mb-0 mt-4 text-center text-sm text-gray-500">
          New here?{" "}
          <Link href="/account/signup" className="font-medium">
            Create an account
          </Link>
        </p>
        <DemoText />
      </FormWrapper>
    </>
  );
}
