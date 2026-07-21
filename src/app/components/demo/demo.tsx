"use client";

import { useRouter } from "next/navigation";
import { createDemoAccount } from "./actions";
import { App, Button } from "antd";
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
    <div className="mt-4 text-center text-sm text-gray-500">
      Just looking around?{" "}
      <Button variant="link" disabled={creating} onClick={onClick}>
        {creating ? "Setting up a demo…" : "Try the demo"}
      </Button>
    </div>
  );
}
