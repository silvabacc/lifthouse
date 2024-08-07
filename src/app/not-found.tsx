"use client";

import Thinking from "./assets/thinking.png";
import { Button, Divider, Space } from "antd";
import { useRouter } from "next/navigation";
import { redirectToHome } from "@/lib/utils";

export default function NotFound() {
  const router = useRouter();
  return (
    <div
      className={`flex h-full bg-no-repeat bg-right bg-fixed`}
      style={{
        backgroundImage: `url(${Thinking.src})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex justify-center items-center w-full">
        <div className="bg-white rounded p-8 border-black shadow-2xl">
          <h1 className="text-5xl font-bold text-center">
            404 - page not found 😔
          </h1>
          <Divider />
          <Space className="flex justify-center" direction="vertical">
            <p className="text-center">
              The page you are looking for doesn&apos;t exist or has been moved.
              Sorry about that.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => redirectToHome(router)}>Go home</Button>
            </div>
          </Space>
          <Divider />
        </div>
      </div>
    </div>
  );
}
