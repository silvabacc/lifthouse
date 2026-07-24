"use client";

import { Layout, Menu } from "antd";
import Image from "next/image";
import LifthouseLogo from "@/app/assets/lifthouse_logo_black.png";
import { usePathname, useRouter } from "next/navigation";
import { pageConfig } from "./constants";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { redirectToHome } from "@/lib/utils";

const { Sider } = Layout;

export default function SideNav() {
  const { collapsedStorage } = useLocalStorage();

  const router = useRouter();
  const pathName = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setCollapsed(collapsedStorage.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Key items by their route so the selected state derives directly from the
  // URL — no remount hack needed when the path changes.
  const items = pageConfig.map((item) => ({
    key: item.route,
    icon: <div>{item.icon}</div>,
    label: item.title,
    onClick: () => router.push(item.route),
  }));

  const onCollapse = (value: boolean) => {
    setCollapsed(value);
    collapsedStorage.set(value);
  };

  const selectedKey =
    pageConfig.find((item) => pathName.startsWith(item.route))?.route ??
    pageConfig[0].route;

  return (
    <Sider
      className="hidden sm:block"
      collapsed={collapsed}
      collapsible
      collapsedWidth={40}
      onCollapse={onCollapse}
      breakpoint="sm"
      theme="light"
    >
      {!collapsed && (
        <Image
          className="hidden sm:block p-2 w-full h-20 object-contain cursor-pointer"
          src={LifthouseLogo}
          alt="Lifthouse"
          sizes="200px"
          onClick={() => redirectToHome(router)}
        />
      )}
      <Menu theme="light" selectedKeys={[selectedKey]} items={items} />
    </Sider>
  );
}
