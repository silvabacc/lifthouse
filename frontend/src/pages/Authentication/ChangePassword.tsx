import React, { useState } from "react";
import Header from "../common/Header";
import { Title } from "chart.js";
import { ErrorMessage, PasswordField, FormButton } from "./components/Form";
import { FormContainer } from "./components/FormStyles";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const ChangePassword: React.FC = () => {
  const [firstNewPassword, setFirstNewPassword] = useState<string | null>("");
  const [secondNewPassword, setsecondNewPassword] = useState<string | null>("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [disableButton, setDisableButton] = useState(false);
  const { resetPassword } = useAuthentication();
  const navigate = useNavigate();

  const changePassword = async () => {
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
      <Header title="Change Password" />
      <FormContainer direction="vertical">
        <ErrorMessage message={errorMessage} />
        <PasswordField setPassword={setFirstNewPassword} />
        <PasswordField setPassword={setsecondNewPassword} />
        <FormButton
          text={"Change Password"}
          onClick={changePassword}
          disabled={disableButton}
        />
      </FormContainer>
    </>
  );
};

export default ChangePassword;
