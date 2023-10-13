import { Button, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { iconSizes } from "@frontend/theme/sizes";
import { useScreen } from "@frontend/hooks/useScreen";
import LifthouseIcon from "@frontend/assets/lifthouse_icon.svg";

const { Title } = Typography;

interface HeaderProps {
  title: string;
  rightHandSide?: React.ReactNode;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  rightHandSide,
  showBackButton = true,
}) => {
  const navigate = useNavigate();
  const { isMobile } = useScreen();

  const onClickBack = () => {
    navigate(-1);
  };

  const IconElement = isMobile ? (
    <Button
      size="large"
      shape="circle"
      style={{ marginRight: 16 }}
      onClick={onClickBack}
    >
      <ArrowLeftOutlined />
    </Button>
  ) : null;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {showBackButton && IconElement}
          <Title level={2} style={{ margin: 0 }}>
            {title}
          </Title>
        </div>

        {rightHandSide}
      </div>
    </>
  );
};

export default Header;
