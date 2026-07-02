import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { FiveThreeOneContextProvider } from "./context";

export default async function FiveThreeOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const db = await createDatabaseClient();
  const fiveThreeOneInfo = await db.getFiveThreeOne();

  return (
    <FiveThreeOneContextProvider initialFiveThreeOne={fiveThreeOneInfo}>
      {children}
    </FiveThreeOneContextProvider>
  );
}
