"use client";

import { useRouter } from "next/navigation";
import { PageAnimation } from "../aniamtions/pageAnimation";
import { Card, Space, Typography } from "antd";
import { pageConfig } from "./components/constants";
import Image from "next/image";

const { Meta } = Card;
const { Paragraph } = Typography;

export default function Lifthouse() {
  const router = useRouter();

  return (
    <PageAnimation>
      <h1>Time to grind 💪</h1>
      <h2>Go to...</h2>
      <div className="grid md:grid-cols-2 lg:flex gap-4">
        {pageConfig.map((config) => (
          <Card
            className="cursor-pointer hover:bg-sky-100"
            cover={
              <Image
                className="object-cover"
                src={config.cover}
                alt={config.title}
                height={200}
              />
            }
            key={config.title}
            onClick={() => router.push(config.route)}
          >
            <Meta
              className="h-24"
              title={config.title}
              description={
                <Paragraph ellipsis={{ rows: 2 }}>
                  {config.description}
                </Paragraph>
              }
            />
          </Card>
        ))}
      </div>
    </PageAnimation>
  );
}
