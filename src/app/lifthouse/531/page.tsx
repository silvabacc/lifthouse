"use client";

import { PageAnimation } from "@/app/aniamtions/pageAnimation";
import { FiveThreeOneContextProvider } from "./context";
import FiveThreeOne from "./fiveThreeOne";

export default function FiveThreeOnePage() {
  return (
    <FiveThreeOneContextProvider>
      <PageAnimation>
        <FiveThreeOne />
      </PageAnimation>
    </FiveThreeOneContextProvider>
  );
}
