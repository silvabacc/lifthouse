import React, { useState } from "react";
import Header from "../common/Header";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const UpdatePassword: React.FC = () => {
  const [firstNewPassword, setFirstNewPassword] = useState<string | null>("");
  const [secondNewPassword, setsecondNewPassword] = useState<string | null>("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [disableButton, setDisableButton] = useState(false);
  const { updatePassword } = useAuthentication();
  const navigate = useNavigate();

  const onClickUpdatePassword = async () => {
    setDisableButton(true);

    if (firstNewPassword !== secondNewPassword) {
      setErrorMessage("Passwords do not match");
      setDisableButton(false);
      return;
    }

    if (firstNewPassword) {
      const result = await updatePassword(firstNewPassword);
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
      <Header title="Update Password" />
      {/* <ErrorMessage message={errorMessage} />
      <PasswordField setPassword={setFirstNewPassword} />
      <PasswordField setPassword={setsecondNewPassword} />
      <FormButton
        text={"Update Password"}
        onClick={onClickUpdatePassword}
        disabled={disableButton}
      /> */}
    </>
  );
};

export default UpdatePassword;
