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
      options: { emailRedirectTo: `${location.origin}/profile` },
    });

    if (error) {
      setAlert(error.message);
    } else {
      messageApi.success("Recovery email sent!");
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
        <FormButton text={"Send Recovery Email"} disabled={disabled} />
      </FormWrapper>
    </>
  );
}
