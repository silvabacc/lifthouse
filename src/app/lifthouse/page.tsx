"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Lifthouse() {
  const router = useRouter();
  const pathName = usePathname();

  //routes user to default path
  useEffect(() => {
    if (pathName === "/lifthouse") {
      router.push("/lifthouse/workouts");
    }
  }, [router, pathName]);

  return <></>;
}
