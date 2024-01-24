"use client";

import { Layout, Menu } from "antd";
import Image from "next/image";
import LifthouseLogo from "@/app/assets/ifthouse_logo_black.png";
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
      icon: <div>🥑</div>,
      label: "Meal tracker",
      onClick: () => router.push("/lifthouse/meal-tracker"),
      path: "/lifthouse/meal-tracker",
    },
    {
      key: "4",
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
      <Image className="hidden sm:block p-2" src={LifthouseLogo} alt="" />
      <Menu theme="light" defaultSelectedKeys={[activeKey]} items={items} />
    </Sider>
  );
}
