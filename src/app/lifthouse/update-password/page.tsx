"use client";

import { Alert, App } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ConfirmPasswordField,
  FormButton,
  FormWrapper,
  PasswordField,
} from "@/app/account/components/form";
import { createSupabaseClient } from "@/lib/supabase/client";
import { PageAnimation } from "@/app/animations/pageAnimation";

interface FieldType {
  password: string;
  confirm: string;
}

export default function UpdatePasswordPage() {
  const { message: messageApi } = App.useApp();
  const [alert, setAlert] = useState<string>();
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onFinish = async ({ password }: FieldType) => {
    setAlert(undefined);
    setSubmitting(true);

    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.updateUser({ password });

    setSubmitting(false);

    if (error) {
      setAlert(error.message);
      return;
    }

    messageApi.success("Password updated");
    router.push("/lifthouse");
  };

  return (
    <PageAnimation>
      <div className="flex flex-col items-center pt-8">
        <h1 className="m-0 text-2xl font-bold">Update password</h1>
        <p className="m-0 mt-1 text-sm text-gray-400">
          Choose a new password for your account
        </p>
        <FormWrapper onFinish={onFinish}>
          {alert && (
            <Alert
              closable={{ onClose: () => setAlert(undefined) }}
              style={{ marginBottom: 12 }}
              title={alert}
              type="error"
            />
          )}
          <PasswordField />
          <ConfirmPasswordField />
          <FormButton
            text={isSubmitting ? "Updating" : "Update password"}
            loading={isSubmitting}
          />
        </FormWrapper>
      </div>
    </PageAnimation>
  );
}
