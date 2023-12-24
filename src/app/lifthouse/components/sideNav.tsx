"use client";

import { Layout, Menu } from "antd";
import { useAppContext } from "@/app/context";
import Image from "next/image";
import LifthouseLogo from "@/app/assets/ifthouse_logo_black.png";
import { useRouter } from "next/navigation";

const { Sider } = Layout;

export default function SiderNav() {
  const { sideNavCollapsed } = useAppContext();
  const router = useRouter();

  return (
    <Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={sideNavCollapsed}
    >
      <Image className="p-2" src={LifthouseLogo} alt="" />
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <div>🏋️</div>,
            label: "Workouts",
            onClick: () => router.push("/lifthouse/workouts"),
          },
          {
            key: "2",
            icon: <div>⛰️</div>,
            label: "Exercises",
            onClick: () => router.push("/lifthouse/exercises"),
          },
          {
            key: "3",
            icon: <div>🥑</div>,
            label: "Meal tracker",
            onClick: () => router.push("/lifthouse/meal-tracker"),
          },
          {
            key: "4",
            icon: <div>⚖️</div>,
            onClick: () => router.push("/lifthouse/weight-ins"),
            label: "Weigh ins",
          },
        ]}
      />
    </Sider>
  );
}
