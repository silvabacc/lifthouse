import { LayoutAnimation } from "../animations/layoutAnimation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutAnimation>
      <section className="flex h-full w-full flex-col items-center justify-center px-4">
        <h1 className="m-0 text-3xl font-bold">LiftHouse 🏋</h1>
        <span className="mt-1 text-sm text-gray-400">
          Enjoy the journey, not the destination
        </span>
        {children}
      </section>
    </LayoutAnimation>
  );
}
