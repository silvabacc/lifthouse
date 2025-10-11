"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AntdStyledComponentsRegistry from "../components/antd";
import { AppContextProvider } from "../context";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AntdStyledComponentsRegistry>{children}</AntdStyledComponentsRegistry>
      </AppContextProvider>
    </QueryClientProvider>
  );
}
