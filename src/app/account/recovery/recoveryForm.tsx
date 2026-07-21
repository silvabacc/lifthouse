"use client";

import { Alert, App } from "antd";
import { EmailField, FormButton, FormWrapper } from "../components/form";
import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";

interface FieldType {
  email: string;
  required?: boolean;
}

export default function RecoveryForm() {
  const supabase = createSupabaseClient();
  const { message: messageApi } = App.useApp();
  const [alert, setAlert] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (info: FieldType) => {
    const { email } = info;
    setAlert("");
    setDisabled(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: { emailRedirectTo: `${location.origin}/lifthouse` },
    });

    if (error) {
      setAlert(error.message);
    } else {
      messageApi.success("Check your inbox for a sign-in link");
    }
    setDisabled(false);
  };

  return (
    <>
      <FormWrapper name="reset-password-form" onFinish={onFinish}>
        {alert && (
          <Alert
            closable={{ onClose: () => setAlert("") }}
            style={{ marginBottom: 12 }}
            title={alert}
            type="error"
          />
        )}
        <EmailField />
        <FormButton text={"Email me a sign-in link"} disabled={disabled} />
        <p className="mb-0 mt-2 text-center text-xs text-gray-400">
          We&apos;ll email you a link that signs you in — you can then set a
          new password from the account menu.
        </p>
      </FormWrapper>
    </>
  );
}
