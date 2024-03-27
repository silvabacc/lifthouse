"use client";

import { useRouter } from "next/navigation";
import { createDemoAccount } from "./actions";
import { message } from "antd";
import { useState } from "react";

type Props = {
  onClick?: () => void;
};

export function DemoText({ onClick }: Props) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onDemoClick = async () => {
    if (creating) {
      return;
    }

    setCreating(true);

    const { error } = await createDemoAccount();

    if (error) {
      messageApi.error("Sorry, something went wrong.");
      messageApi.destroy();
    } else {
      messageApi.destroy();
      messageApi.loading("Creating demo account 🚀");
      router.push("/lifthouse");
    }

    onClick && onClick();
    setCreating(false);
  };

  return (
    <div className="text-sm text-gray-600 mt-6">
      {contextHolder}
      Want to try out Lifthouse? Use our{" "}
      <span
        className="text-blue-500 cursor-pointer"
        onClick={() => {
          onDemoClick();
        }}
      >
        demo
      </span>{" "}
      to get started!
    </div>
  );
}
