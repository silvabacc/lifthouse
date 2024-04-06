"use client";

import { useRouter } from "next/navigation";
import { createDemoAccount } from "./actions";
import { message } from "antd";
import { useState } from "react";

export function DemoText() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onClick = async () => {
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
      messageApi.success("Logging you in...");
      router.push("/lifthouse");
    }

    setCreating(false);
  };

  return (
    <div className="text-sm text-gray-600 mt-4">
      {contextHolder}
      Want to try out Lifthouse? Use our{" "}
      <span
        className="text-blue-500 cursor-pointer"
        onClick={() => {
          onClick();
        }}
      >
        demo
      </span>{" "}
      to get started!
    </div>
  );
}
