import { Typography } from "antd";
import React from "react";
import { HeaderContainer, TitleContainer } from "./HeaderStyles";
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
    <HeaderContainer direction="vertical">
      <CloseOutlined style={{ fontSize: 24 }} onClick={onClickBack} />
      <TitleContainer>
        <Title level={2}>{title}</Title>
        {rightHandSide}
      </TitleContainer>
    </HeaderContainer>
  );
};

export default Header;
