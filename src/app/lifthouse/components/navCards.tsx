"use client";

import { PageConfig } from "./constants";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

type NavigationCardProps = {
  config: PageConfig;
};

export default function NavigationCard({ config }: NavigationCardProps) {
  return (
    <Link href={config.route} className="block w-full">
      <article className="group h-full overflow-hidden rounded-xl border border-solid border-gray-100 bg-white transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={config.cover}
            alt=""
            fill
            placeholder="blur"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="m-0 flex items-center gap-2 text-base font-semibold text-gray-900">
              <span aria-hidden>{config.icon}</span>
              {config.title}
            </h2>
            <ArrowRightOutlined className="text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-indigo-500" />
          </div>
          <p className="m-0 mt-1 line-clamp-2 text-sm text-gray-500">
            {config.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
