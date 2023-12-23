"use client";

import { Layout, Menu } from "antd";
import { useAppContext } from "@/app/context";
import Image from "next/image";
import LifthouseLogo from "@/app/assets/ifthouse_logo_black.png";

const { Sider } = Layout;

export default function SiderNav() {
  const { sideNavCollapsed } = useAppContext();

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
        items={[
          {
            key: "1",
            icon: <div>🏋️</div>,
            label: "Workouts",
          },
          {
            key: "2",
            icon: <div>⛰️</div>,
            label: "Exercises",
          },
          {
            key: "3",
            icon: <div>🥑</div>,
            label: "Meal tracker",
          },
          {
            key: "4",
            icon: <div>⚖️</div>,

            label: "Weigh ins",
          },
        ]}
      />
    </Sider>
  );
}
