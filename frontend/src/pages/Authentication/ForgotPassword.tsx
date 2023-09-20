import useAuthentication from "@frontend/hooks/useAuthentication";
import React, { useState } from "react";
import { EmailField, FormButton } from "./components/Form";
import AuthPageHeader from "./components/AuthPageHeader";
import { Alert, Form, Typography, message } from "antd";
import { AuthenticationContainer } from "./AuthenticationStyles";
import { FormWrapper } from "./components/FormStyles";

const { Title } = Typography;

interface FieldType {
  email: string;
  required?: boolean;
}

const ForgotPassword: React.FC = () => {
  const { resetPasswordWithEmail } = useAuthentication();
  const [disableButton, setDisableButton] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [alert, setAlert] = useState("");

  const toastMessage = (message: string) => {
    messageApi.destroy();
    messageApi.open({
      type: "success",
      content: message,
      duration: 5,
    });
  };

  const onFinish = async (info: FieldType) => {
    const { email } = info;
    setDisableButton(true);

    const result = await resetPasswordWithEmail(email);
    if (result.success) {
      toastMessage(
        `Reset email have been sent to ${email}, please check your inbox and reset your password`
      );
    } else {
      setAlert(result.message);
    }

    setDisableButton(false);
  };

  return (
    <AuthenticationContainer>
      {contextHolder}
      <AuthPageHeader />
      <Title level={4}>Enter your registered Email</Title>
      {alert && (
        <Alert
          closable
          onClose={() => setAlert("")}
          style={{ marginBottom: 12 }}
          message={alert}
          type="error"
        />
      )}
      <FormWrapper>
        <Form name="reset-password-form" onFinish={onFinish}>
          <EmailField />
          <FormButton disabled={disableButton} text={"Send Recovery Email"} />
        </Form>
      </FormWrapper>
    </AuthenticationContainer>
  );
};

export default ForgotPassword;
