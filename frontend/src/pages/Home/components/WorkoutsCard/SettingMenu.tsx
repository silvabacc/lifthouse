import React from "react";
import {
  LogoutOutlined,
  UnlockOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import colors from "@frontend/theme/colors";

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
      label: "Change Password",
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
        navigate("/change-password");
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
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default SettingMenu;
