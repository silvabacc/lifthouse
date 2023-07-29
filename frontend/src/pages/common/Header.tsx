import { Typography } from "antd";
import React from "react";
import { HeaderContainer, TitleContainer } from "./HeaderStyles";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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
      <FaArrowLeft onClick={onClickBack} size={24} />
      <TitleContainer>
        <Title level={3}>{title}</Title>
        {rightHandSide}
      </TitleContainer>
    </HeaderContainer>
  );
};

export default Header;
