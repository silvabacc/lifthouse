import { LayoutAnimation } from "@/app/aniamtions/layoutAnimation";
import { WeightContextProvider } from "./context";

export default function WeightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutAnimation>
      <WeightContextProvider>{children}</WeightContextProvider>
    </LayoutAnimation>
  );
}
