"use client";

import { Layout, Menu } from "antd";
import Image from "next/image";
import LifthouseLogo from "@/app/assets/lifthouse_logo_black.png";
import { usePathname, useRouter } from "next/navigation";

const { Sider } = Layout;

export default function SiderNav() {
  const router = useRouter();
  const pathName = usePathname();

  const items = [
    {
      key: "1",
      icon: <div>🏋️</div>,
      label: "Workouts",
      onClick: () => router.push("/lifthouse/workouts"),
      path: "/lifthouse/workouts",
    },
    {
      key: "2",
      icon: <div>⛰️</div>,
      label: "Exercises",
      onClick: () => router.push("/lifthouse/exercises"),
      path: "/lifthouse/exercises",
    },
    {
      key: "3",
      icon: <div>🦾</div>,
      label: "531",
      onClick: () => router.push("/lifthouse/531"),
      path: "/lifthouse/531",
    },
    {
      key: "4",
      icon: <div>🥑</div>,
      label: "Meals",
      onClick: () => router.push("/lifthouse/meals"),
      path: "/lifthouse/meals",
    },
    {
      key: "5",
      icon: <div>⚖️</div>,
      onClick: () => router.push("/lifthouse/weight"),
      label: "Weight",
      path: "/lifthouse/weight",
    },
  ];

  const activeKey =
    items.find((item) => pathName.startsWith(item.path))?.key || "1";

  return (
    <Sider collapsedWidth={40} breakpoint="sm" theme="light" trigger={null}>
      <Image
        className="hidden sm:block p-2 w-full h-20"
        src={LifthouseLogo}
        alt=""
      />
      <Menu theme="light" defaultSelectedKeys={[activeKey]} items={items} />
    </Sider>
  );
}
