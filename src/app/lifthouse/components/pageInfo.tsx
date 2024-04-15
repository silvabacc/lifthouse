"use client";

import { Breadcrumb, Button } from "antd";
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
    <div className="bg-white px-6 pb-4">
      <Breadcrumb items={items} />
      <div id="page-info" />
    </div>
  );
}

type Props = {
  children?: JSX.Element;
  extra?: JSX.Element;
  title?: string;
};
export function PageInfoPortal({ children, extra, title }: Props) {
  const [mounted, setMounted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => setMounted(true), []);

  const element = document.getElementById("page-info");

  return mounted && element
    ? createPortal(
        <div className="pt-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className={`${showInfo ? "block" : "hidden"} sm:block`}>
            {children}
          </div>
          <div className="w-full overflow-x-auto">{extra}</div>
          {children && (
            <Button
              onClick={() => setShowInfo(!showInfo)}
              className={"block sm:hidden p-0 mt-2"}
              type="link"
            >
              {showInfo ? "Show less" : "Show More"}
            </Button>
          )}
        </div>,
        element
      )
    : null;
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
