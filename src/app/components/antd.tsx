"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";

export default function AntdStyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache] = React.useState(() => createCache()); // gets antd cached styles

  // innsert cache style on the server
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    ></style>
  ));

  return (
    // <ConfigProvider
    //   theme={{
    //     components: {
    //       Button: {
    //         colorPrimary: "#000",
    //         colorPrimaryActive: "#000",
    //         colorPrimaryHover: "#000",
    //       },
    //     },
    //   }}
    // >
    <StyleProvider cache={cache}>{children}</StyleProvider>
    // </ConfigProvider>
  );
}
