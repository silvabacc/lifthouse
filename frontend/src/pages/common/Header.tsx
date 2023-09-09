import { Typography } from "antd";
import React from "react";
import { HeaderContainer, TitleContainer } from "./HeaderStyles";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

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
      <RxCross1 onClick={onClickBack} size={24} />
      <TitleContainer>
        <Title level={2}>{title}</Title>
        {rightHandSide}
      </TitleContainer>
    </HeaderContainer>
  );
};

export default Header;
