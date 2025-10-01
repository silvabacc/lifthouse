import FiveThreeOneContextProvider from "./context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <FiveThreeOneContextProvider>{children}</FiveThreeOneContextProvider>;
}
