import { Layout } from "antd";
import Header from "./components/header";
import PageInfo from "./components/pageInfo/pageInfo";
import SideNav from "./components/sideNav";
import { LayoutAnimation } from "../aniamtions/layoutAnimation";

export default function LiftHouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutAnimation>
      <Layout className="h-full">
        <SideNav />
        <Layout className="h-full">
          <Header />
          <PageInfo />
          <Layout>
            <div className="m-6 h-full overflow-auto rounded-lg">
              {children}
            </div>
          </Layout>
        </Layout>
      </Layout>
    </LayoutAnimation>
  );
}
