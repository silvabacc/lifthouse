"use client";

import { Button, Dropdown, Layout, MenuProps } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useAppContext } from "@/app/context";
import { UnlockOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import getConfig from "@/config";

const { Header: AntDHeader } = Layout;

const { pageUrl } = getConfig();

export default function Header() {
  const { user } = useAppContext();
  const { clearAllLocalStorage } = useLocalStorage();
  const router = useRouter();
  const supabase = createSupabaseClient();

  const items: MenuProps["items"] = [
    {
      label: user?.email,
      key: "0",
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
        router.push(`/${pageUrl}/update-password`);
        break;
      case "2":
        supabase.auth.signOut();
        clearAllLocalStorage();
        router.push("/");
        break;
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    //Tailwind doesn't apply to AntD components
    <AntDHeader
      style={{
        background: "white",
        padding: 16,
        display: "flex",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      <Dropdown menu={menuProps}>
        <Button shape="circle">
          <div className="flex items-center justify-center text-md">
            <SettingOutlined />
          </div>
        </Button>
      </Dropdown>
    </AntDHeader>
  );
}
