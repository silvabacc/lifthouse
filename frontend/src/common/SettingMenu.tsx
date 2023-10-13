import React from "react";
import {
  LogoutOutlined,
  UnlockOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import colors from "@frontend/theme/colors";
import { iconSizes } from "@frontend/theme/sizes";

const SettingMenu: React.FC = () => {
  const { signOut, auth } = useAuthentication();
  const { email } = auth.user;
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: email,
      key: "0",
      style: { backgroundColor: colors.light_grey },
    },
    {
      label: "Update Password",
      key: "1",
      icon: <UnlockOutlined />,
    },
    {
      label: "Logout",
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "1":
        navigate("/update-password");
        break;
      case "2":
        signOut();
        navigate("/login");
        break;
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps}>
      <Button type="ghost">
        <SettingOutlined style={{ fontSize: iconSizes.md }} />
      </Button>
    </Dropdown>
  );
};

export default SettingMenu;
