"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";
import { theme } from "@/theme";

export default function AntdStyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = React.useState(() => createCache());

  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider theme={theme}>
        <App className="h-full">{children}</App>
      </ConfigProvider>
    </StyleProvider>
  );
}
