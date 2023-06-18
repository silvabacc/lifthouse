import React from "react";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space } from "antd";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const SettingMenu: React.FC = () => {
  const { signOut } = useAuthentication();
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: "Logout",
      key: "0",
      icon: <LogoutOutlined />,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "0":
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
