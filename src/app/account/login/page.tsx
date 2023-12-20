"use client";

import { useRouter } from "next/navigation";
import { GoogleOutlined } from "@ant-design/icons";
import {
  EmailField,
  FormButton,
  FormContainer,
  PasswordField,
} from "./components/form";
import { Button, Divider, Form, message } from "antd";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import Link from "next/link";
import { useAppcontext } from "@/app/context";

enum Provider {
  Google = "google",
}

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { user, setUser } = useAppcontext();

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

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser(session.user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {contextHolder}
      <FormContainer>
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
      </FormContainer>
    </div>
  );
}
