import React from "react";
import AuthPageHeader from "../components/AuthPageHeader";
import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { VerifyContainer } from "./VerifyStyles";
import { RollbackOutlined } from "@ant-design/icons";

interface VerifyProps {
  email?: string;
}

const { Text } = Typography;

const Verify: React.FC<VerifyProps> = ({ email }) => {
  const navigate = useNavigate();

  const verifyText = email
    ? `We have sent an email to ${email}, please verify this email in order to log in`
    : `Please verify your email in order to log in`;

  const onBackPress = () => navigate("/");

  return (
    <>
      <AuthPageHeader />
      <VerifyContainer direction="vertical">
        <Text>{verifyText}</Text>
        <Button
          icon={<RollbackOutlined />}
          type="primary"
          onClick={onBackPress}
        >
          Go Back
        </Button>
      </VerifyContainer>
    </>
  );
};

export default Verify;
