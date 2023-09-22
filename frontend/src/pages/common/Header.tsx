import { Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface HeaderProps {
  title: string;
  rightHandSide?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, rightHandSide }) => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <>
      <CloseOutlined style={{ fontSize: 24 }} onClick={onClickBack} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Title level={2}>{title}</Title>
        {rightHandSide}
      </div>
    </>
  );
};

export default Header;
