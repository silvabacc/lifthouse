"use client";

import { Layout, Menu } from "antd";
import Image from "next/image";
import LifthouseLogo from "@/app/assets/lifthouse_logo_black.png";
import { usePathname, useRouter } from "next/navigation";
import { pageConfig } from "./constants";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { redirectToHome } from "@/lib/utils";

const { Sider } = Layout;

export default function SiderNav() {
  const { collapsedStorage } = useLocalStorage();
  const collapsedStorageValue = collapsedStorage.get();

  const router = useRouter();
  const pathName = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(collapsedStorageValue);

  useEffect(() => {
    setCollapsed(collapsedStorageValue);
  }, [collapsedStorage, collapsedStorageValue]);

  const items = pageConfig.map((item, index) => ({
    key: `${index + 1}`,
    icon: <div>{item.icon}</div>,
    label: item.title,
    onClick: () => router.push(item.route),
    path: item.route,
  }));

  const onCollapse = (value: boolean) => {
    setCollapsed(value);
    collapsedStorage.set(value);
  };

  const activeKey =
    items.find((item) => pathName.startsWith(item.path))?.key || "1";

  return (
    <Sider
      collapsed={collapsed}
      collapsible
      collapsedWidth={40}
      onCollapse={onCollapse}
      breakpoint="sm"
      theme="light"
    >
      {!collapsed && (
        <Image
          className="hidden sm:block p-2 w-full h-20 cursor-pointer"
          src={LifthouseLogo}
          alt=""
          onClick={() => redirectToHome(router)}
        />
      )}
      <Menu theme="light" defaultSelectedKeys={[activeKey]} items={items} />
    </Sider>
  );
}
