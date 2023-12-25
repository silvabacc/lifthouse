"use client";

import { PageStartAnimation } from "@/app/aniamtions/pageStartAnimation";
import { PageInfoPortal } from "../components/pageInfo";

export default function Workouts() {
  return (
    <PageStartAnimation>
      <PageInfoPortal>
        <h1>Hello!</h1>
      </PageInfoPortal>
    </PageStartAnimation>
  );
}
