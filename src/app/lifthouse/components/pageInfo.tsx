"use client";

import { Breadcrumb } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function PageInfo() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const breadcrumbs = generateBreadcrumbs(
    pathName,
    searchParams.get("name") || ""
  );

  const items = breadcrumbs.map((breadcrumb, index) => {
    const isLast = index === breadcrumbs.length - 1;

    return {
      title: !isLast ? (
        <Link href={breadcrumb.path}>
          {capitalizeFirstLetter(breadcrumb.title)}
        </Link>
      ) : (
        capitalizeFirstLetter(breadcrumb.title)
      ),
    };
  });

  return (
    <div className="bg-white p-6">
      <Breadcrumb items={items} />
      <div id="page-info" />
    </div>
  );
}

type Props = {
  children: JSX.Element;
};
export function PageInfoPortal({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const element = document.getElementById("page-info");

  return mounted && element ? createPortal(<>{children}</>, element) : null;
}

function generateBreadcrumbs(pathname: string, name?: string) {
  const segments = pathname
    .split("/")
    .filter((segment) => segment.trim() !== ""); // Remove empty segments

  let breadcrumbs = [];
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({ title: segment, path: currentPath });
  }

  if (name) {
    breadcrumbs[breadcrumbs.length - 1].title = name;
  }

  return breadcrumbs;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
