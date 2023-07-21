import React, { useEffect, useState } from "react";
import AuthPageHeader from "./components/AuthPageHeader";
import { FormContainer } from "./components/FormStyles";
import { Typography } from "antd";
import { ErrorMessage, FormButton, PasswordField } from "./components/Form";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const PasswordReset: React.FC = () => {
  const [firstNewPassword, setFirstNewPassword] = useState<string | null>("");
  const [secondNewPassword, setsecondNewPassword] = useState<string | null>("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [disableButton, setDisableButton] = useState(false);
  const { resetPassword } = useAuthentication();
  const navigate = useNavigate();

  const resetPasswordOnClick = async () => {
    setDisableButton(true);

    if (firstNewPassword !== secondNewPassword) {
      setErrorMessage("Passwords do not match");
      setDisableButton(false);
      return;
    }

    if (firstNewPassword) {
      const result = await resetPassword(firstNewPassword);
      if (result.success) {
        navigate("/home");
      } else {
        setErrorMessage(result.message);
      }
    } else {
      setErrorMessage("Please enter your new password");
    }

    setDisableButton(false);
  };

  return (
    <>
      <AuthPageHeader />
      <FormContainer direction="vertical">
        <Title level={4}>Reset password</Title>
        <ErrorMessage message={errorMessage} />
        <PasswordField setPassword={setFirstNewPassword} />
        <PasswordField setPassword={setsecondNewPassword} />
        <FormButton
          text={"Reset Password"}
          onClick={resetPasswordOnClick}
          disabled={disableButton}
        />
      </FormContainer>
    </>
  );
};

export default PasswordReset;
