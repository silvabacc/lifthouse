"use client";

import { PageStartAnimation } from "@/app/aniamtions/pageStartAnimation";
import { Alert, message } from "antd";
import { EmailField, FormButton, FormWrapper } from "../components/form";
import { useState } from "react";

interface FieldType {
  email: string;
  required?: boolean;
}

export default function RecoveryForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const [alert, setAlert] = useState("");

  const onFinish = (info: FieldType) => {};

  return (
    <PageStartAnimation>
      {alert && (
        <Alert
          closable
          onClose={() => setAlert("")}
          style={{ marginBottom: 12 }}
          message={alert}
          type="error"
        />
      )}
      <FormWrapper name="reset-password-form" onFinish={onFinish}>
        <EmailField />
        <FormButton text={"Send Recovery Email"} />
      </FormWrapper>
    </PageStartAnimation>
  );
}
