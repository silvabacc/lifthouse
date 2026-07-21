"use client";

import { Dropdown, Layout, MenuProps } from "antd";
import {
  UnlockOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
    {
      label: <span className="text-xs text-gray-400">{email}</span>,
      key: "email",
      disabled: true,
    },
    { type: "divider" },
    { label: "Update password", key: "update-password", icon: <UnlockOutlined /> },
    { label: "Log out", key: "logout", icon: <LogoutOutlined />, danger: true },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "update-password") {
      router.push("/lifthouse/update-password");
    } else if (e.key === "logout") {
      clearAllLocalStorage();
      startTransition(() => signOut());
    }
  };

  const initial = email.charAt(0).toUpperCase() || <UserOutlined />;

  return (
    <AntDHeader
      style={{
        background: "white",
        paddingInline: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
        <button
          type="button"
          aria-label="Account menu"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-indigo-50 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-100"
        >
          {initial}
        </button>
      </Dropdown>
    </AntDHeader>
  );
}
