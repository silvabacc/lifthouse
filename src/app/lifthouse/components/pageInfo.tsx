"use client";

import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PageInfo() {
  const pathName = usePathname();

  const breadcrumbs = generateBreadcrumbs(pathName);

  const items = breadcrumbs.map((breadcrumb) => {
    return {
      title: (
        <Link href={breadcrumb.path}>
          {capitalizeFirstLetter(breadcrumb.title)}
        </Link>
      ),
    };
  });

  return (
    <div className="bg-white p-6">
      <Breadcrumb items={items} />
    </div>
  );
}

function generateBreadcrumbs(pathname: string) {
  const segments = pathname
    .split("/")
    .filter((segment) => segment.trim() !== ""); // Remove empty segments

  let breadcrumbs = [];
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({ title: segment, path: currentPath });
  }

  return breadcrumbs;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
