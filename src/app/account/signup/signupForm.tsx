"use client";

import { Alert, App } from "antd";
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
import { signUp } from "./actions";

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
  const { message: messageApi } = App.useApp();
  const [alert, setAlert] = useState<string>();
  const router = useRouter();

  const onFinish = async (info: FieldType) => {
    const { email, password } = info;
    setAlert("");
    messageApi.loading("Creating account...");

    const { error } = await signUp(email, password);

    if (error) {
      messageApi.destroy();
      setAlert(error);
    } else {
      messageApi.destroy();
      messageApi.success("Logging you in...");
      router.push("/");
    }
  };

  return (
    <>
      <FormWrapper onFinish={onFinish}>
        {alert && (
          <Alert
            closable={{ onClose: () => setAlert("") }}
            style={{ marginBottom: 12 }}
            title={alert}
            type="error"
          />
        )}
        <EmailField />
        <PasswordField />
        <ConfirmPasswordField />
        <FormButton text={"Create account"} />
        <p className="mb-0 mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/account/login" className="font-medium">
            Log in
          </Link>
        </p>
      </FormWrapper>
    </>
  );
}
