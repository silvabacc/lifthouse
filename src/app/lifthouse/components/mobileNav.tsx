"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageConfig } from "./constants";

/**
 * Bottom tab bar shown on small screens only. The sidebar collapses to an
 * unusably narrow rail on phones, and this is a mobile-first app used
 * one-handed mid-workout — thumb-reachable tabs are the right pattern.
 */
export default function MobileNav() {
  const pathName = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-50 flex border-0 border-t border-solid border-gray-100 bg-white pb-[env(safe-area-inset-bottom)] sm:hidden"
    >
      {pageConfig.map((item) => {
        const isActive = pathName.startsWith(item.route);
        return (
          <Link
            key={item.route}
            href={item.route}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
              isActive ? "text-indigo-600" : "text-gray-400"
            }`}
          >
            <span
              aria-hidden
              className={`flex h-7 w-11 items-center justify-center rounded-full text-base transition-colors ${
                isActive ? "bg-indigo-50" : ""
              }`}
            >
              {item.icon}
            </span>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
