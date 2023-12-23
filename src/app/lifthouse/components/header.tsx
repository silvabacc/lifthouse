"use client";

import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useAppContext } from "@/app/context";

const { Header: AntDHeader } = Layout;

export default function Header() {
  const { sideNavCollapsed, setSideNavCollapsed } = useAppContext();

  return (
    //Tailwind doesn't apply to AntD components
    <AntDHeader style={{ background: "white", padding: 0 }}>
      <Button
        type="text"
        icon={sideNavCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setSideNavCollapsed(!sideNavCollapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </AntDHeader>
  );
}
