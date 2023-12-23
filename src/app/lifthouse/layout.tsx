import { Layout, Menu } from "antd";
import SiderNav from "./components/sideNav";
import Header from "./components/header";
import { PageStartAnimation } from "../aniamtions/pageStartAnimation";
import PageInfo from "./components/pageInfo";

export default function LiftHouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageStartAnimation className="h-full">
      <Layout className="h-full">
        <SiderNav />
        <Layout className="h-full">
          <Header />
          <PageInfo />
          <Layout>
            <div className="m-6 bg-white h-full overflow rounded-lg">
              {children}
            </div>
          </Layout>
        </Layout>
      </Layout>
    </PageStartAnimation>
  );
}
