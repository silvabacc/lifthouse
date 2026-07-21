import { Layout } from "antd";
import Header from "./components/header";
import PageInfo from "./components/pageInfo";
import SideNav from "./components/sideNav";
import MobileNav from "./components/mobileNav";
import { LayoutAnimation } from "../animations/layoutAnimation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function LiftHouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createSupabaseServer(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <LayoutAnimation>
      <Layout className="h-full">
        <SideNav />
        <Layout className="h-full">
          <Header email={user?.email ?? ""} />
          <PageInfo />
          <Layout>
            <div className="m-4 h-full overflow-auto rounded-lg pb-20 sm:m-6 sm:pb-0">
              {children}
            </div>
          </Layout>
        </Layout>
        <MobileNav />
      </Layout>
    </LayoutAnimation>
  );
}
