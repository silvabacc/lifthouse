"use client";

import { PageStartAnimation } from "@/app/aniamtions/pageStartAnimation";
import { Alert, message } from "antd";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  ConfirmPasswordField,
  EmailField,
  FormButton,
  FormWrapper,
  PasswordField,
} from "../components/form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Defined by the Form elements based on 'name' property
 */
interface FieldType {
  email: string;
  password: string;
  confirm: string;
  required?: boolean;
}

export default function SignupForm() {
  const supabase = createClientComponentClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [alert, setAlert] = useState<string>();
  const router = useRouter();

  const onFinish = async (info: FieldType) => {
    const { email, password } = info;
    setAlert("");
    messageApi.loading("Creating account...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setAlert(error.message);
    } else {
      messageApi.destroy();
      messageApi.success("Logging you in...");
      router.push("/");
    }
  };

  return (
    <PageStartAnimation>
      {contextHolder}
      <FormWrapper onFinish={onFinish}>
        {alert && (
          <Alert
            closable
            onClose={() => setAlert("")}
            style={{ marginBottom: 12 }}
            message={alert}
            type="error"
          />
        )}
        <EmailField />
        <PasswordField />
        <ConfirmPasswordField />
        <FormButton text={"Sign Up"} />
        <Link href="/account/login">Already a user?</Link>
      </FormWrapper>
    </PageStartAnimation>
  );
}
