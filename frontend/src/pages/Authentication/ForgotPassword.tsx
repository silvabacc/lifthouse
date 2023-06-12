import useAuthentication from "@frontend/hooks/useAuthentication";
import React, { useEffect, useState } from "react";
import { EmailField, FormButton } from "./components/Form";
import AuthPageHeader from "./components/AuthPageHeader";
import { FormContainer } from "./components/FormStyles";
import { Typography } from "antd";

const { Title, Text } = Typography;

const ForgotPassword: React.FC = () => {
  const { resetPasswordWithEmail } = useAuthentication();
  const [email, setEmail] = useState<string | null>("");
  const [disableButton, setDisableButton] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    setMessage("");
    setDisableButton(true);

    if (email) {
      const result = await resetPasswordWithEmail(email);
      if (result.success) {
        setMessage(
          `Reset email have been sent to ${email}, please check your inbox and reset your password`
        );
      } else {
        setMessage(result.message);
      }
    } else {
      setMessage("Please fill in your email");
    }

    setDisableButton(false);
  };

  return (
    <>
      <AuthPageHeader />
      <FormContainer direction="vertical">
        <Title level={4}>Enter your registered Email</Title>
        <Text>{message}</Text>
        <EmailField setEmail={setEmail} />
        <FormButton text="Submit" disabled={disableButton} onClick={onSubmit} />
      </FormContainer>
    </>
  );
};

export default ForgotPassword;
