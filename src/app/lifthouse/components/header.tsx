"use client";

import { Button, Dropdown, Layout, MenuProps } from "antd";
import { SettingOutlined, UnlockOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { signOut } from "../actions";

const { Header: AntDHeader } = Layout;

type Props = {
  email: string;
};

export default function Header({ email }: Props) {
  const { clearAllLocalStorage } = useLocalStorage();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const items: MenuProps["items"] = [
    { label: email, key: "0" },
    { label: "Update Password", key: "1", icon: <UnlockOutlined /> },
    { label: "Logout", key: "2", icon: <LogoutOutlined /> },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      router.push("/lifthouse/update-password");
    } else if (e.key === "2") {
      clearAllLocalStorage();
      startTransition(() => signOut());
    }
  };

  return (
    <AntDHeader
      style={{
        background: "white",
        padding: 16,
        display: "flex",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      <Dropdown menu={{ items, onClick: handleMenuClick }}>
        <Button shape="circle">
          <div className="flex items-center justify-center text-md">
            <SettingOutlined />
          </div>
        </Button>
      </Dropdown>
    </AntDHeader>
  );
}
