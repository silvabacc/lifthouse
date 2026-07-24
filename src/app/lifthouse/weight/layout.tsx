import { WeightContextProvider } from "./context";

export default function WeightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <WeightContextProvider>{children}</WeightContextProvider>
    </div>
  );
}
