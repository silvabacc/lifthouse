export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="text-4xl font-bold">LiftHouse 🏋</h1>
      <span className="text-gray-500 text-sm">
        Enjoy the journey, not the destination
      </span>
      {children}
    </section>
  );
}
