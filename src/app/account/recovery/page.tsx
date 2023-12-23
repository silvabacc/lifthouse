import { PageStartAnimation } from "@/app/aniamtions/pageStartAnimation";
import { useState } from "react";
import RecoveryForm from "./recoveryForm";

export default function Recovery() {
  return (
    <PageStartAnimation>
      <RecoveryForm />
    </PageStartAnimation>
  );
}
