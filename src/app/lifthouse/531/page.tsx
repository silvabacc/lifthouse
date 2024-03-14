"use client";

import { FiveThreeOneContextProvider } from "./context";
import FiveThreeOne from "./fiveThreeOne";

export default function FiveThreeOnePage() {
  return (
    <FiveThreeOneContextProvider>
      <FiveThreeOne />
    </FiveThreeOneContextProvider>
  );
}
