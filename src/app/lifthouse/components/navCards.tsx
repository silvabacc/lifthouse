"use client";

import { Card, Typography } from "antd";
import { PageConfig } from "./constants";
import Image from "next/image";
import Link from "next/link";

const { Meta } = Card;
const { Paragraph } = Typography;

type NavigationCardProps = {
  config: PageConfig;
};

export default function NavigationCard({ config }: NavigationCardProps) {
  return (
    <Link href={config.route} key={config.title} className="block w-full">
      <Card
        className="w-full cursor-pointer hover:bg-sky-100"
        cover={
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={config.cover}
              alt={config.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        }
      >
        <Meta
          className="h-24"
          title={config.title}
          description={
            <Paragraph ellipsis={{ rows: 2 }}>{config.description}</Paragraph>
          }
        />
      </Card>
    </Link>
  );
}
