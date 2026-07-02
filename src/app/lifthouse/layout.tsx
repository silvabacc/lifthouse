import { Layout } from "antd";
import Header from "./components/header";
import PageInfo from "./components/pageInfo";
import SideNav from "./components/sideNav";
import { LayoutAnimation } from "../aniamtions/layoutAnimation";
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
            <div className="m-6 h-full overflow-auto rounded-lg">{children}</div>
          </Layout>
        </Layout>
      </Layout>
    </LayoutAnimation>
  );
}
