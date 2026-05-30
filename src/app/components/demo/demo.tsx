"use client";

import { useRouter } from "next/navigation";
import { createDemoAccount } from "./actions";
import { App } from "antd";
import { useState } from "react";
import { redirectToHome } from "@/lib/utils";

export function DemoText() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const { message: messageApi } = App.useApp();

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
      redirectToHome(router);
    }

    setCreating(false);
  };

  return (
    <div className="text-sm text-gray-600 mt-4">
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
