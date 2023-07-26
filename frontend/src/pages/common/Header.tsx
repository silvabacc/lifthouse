import { Space, Typography } from "antd";
import React from "react";
import { BackNavigationIcon, HeadContainer } from "./HeaderStyles";
import { useNavigate } from "react-router-dom";

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
    <HeadContainer>
      <Space>
        <div onClick={onClickBack}>
          <BackNavigationIcon size={24} />
        </div>
        <Title level={3}>{title}</Title>
      </Space>
      {rightHandSide}
    </HeadContainer>
  );
};

export default Header;
