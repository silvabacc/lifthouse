import React, { useState } from "react";
import Header from "../common/Header";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import {
  ConfirmPasswordField,
  FormButton,
  FormWrapper,
  PasswordField,
} from "./components/Form";
import { AuthenticationContainer } from "./AuthenticationStyles";
import AuthPageHeader from "./components/AuthPageHeader";
import { Alert, message } from "antd";

interface FieldType {
  password: string;
  confirm: string;
}

const UpdatePassword: React.FC = () => {
  const [alert, setAlert] = useState<string | null>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [disableButton, setDisableButton] = useState(false);
  const { updatePassword } = useAuthentication();
  const navigate = useNavigate();

  const onFinish = async (info: FieldType) => {
    const { password } = info;
    setDisableButton(true);
    setAlert("");

    messageApi.loading("Updating password...");
    const result = await updatePassword(password);
    if (result.success) {
      navigate("/home", { state: { passwordUpdated: true } });
    } else {
      messageApi.destroy();
      setAlert(result.message);
    }

    setDisableButton(false);
  };

  return (
    <div style={{ height: "50vh" }}>
      {contextHolder}
      <Header title="" />
      <AuthenticationContainer>
        <AuthPageHeader />
        {alert && (
          <Alert
            closable
            onClose={() => setAlert("")}
            style={{ marginBottom: 12 }}
            message={alert}
            type="error"
          />
        )}
        <FormWrapper
          title="Update Password"
          name="update-password"
          onFinish={onFinish}
        >
          <PasswordField />
          <ConfirmPasswordField />
          <FormButton disabled={disableButton} text="Update Password" />
        </FormWrapper>
      </AuthenticationContainer>
    </div>
  );
};

export default UpdatePassword;
