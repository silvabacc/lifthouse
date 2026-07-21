import { Layout } from "antd";
import { Suspense } from "react";
import Header from "./components/header";
import PageInfo from "./components/pageInfo";
import SideNav from "./components/sideNav";
import MobileNav from "./components/mobileNav";
import { createSupabaseServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";

/**
 * The user fetch lives in its own Suspense boundary so page content streams
 * immediately instead of blocking every route on a Supabase auth round-trip.
 * The proxy has already verified the session — this fetch only supplies the
 * email for the account menu.
 */
async function UserHeader() {
  const cookieStore = await cookies();
  const supabase = createSupabaseServer(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Header email={user?.email ?? ""} />;
}

export default function LiftHouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Layout className="h-full" hasSider>
        <SideNav />
        <Layout className="h-full">
          <Suspense fallback={<Header email="" />}>
            <UserHeader />
          </Suspense>
          <PageInfo />
          <Layout>
            <div className="m-4 h-full overflow-auto rounded-lg pb-20 sm:m-6 sm:pb-0">
              {children}
            </div>
          </Layout>
        </Layout>
        <MobileNav />
      </Layout>
    </div>
  );
}
