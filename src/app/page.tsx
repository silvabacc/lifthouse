import { Button, Divider, Space } from "antd";
import BannerImage from "./assets/banner.png";
import BackgroundImage from "./assets/selfmade.png";
import Image from "next/image";
import Link from "next/link";
import { DemoText } from "./components/demo/demo";

const FALLBACK_QUOTE = {
  text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
  author: "Marcus Aurelius",
};

async function getQuote() {
  try {
    const quoteResponse = await fetch("https://stoic-quotes.com/api/quote", {
      // Cache for an hour so the landing page stays fast and doesn't
      // depend on the quote API per-request
      next: { revalidate: 3600 },
    });
    if (!quoteResponse.ok) return FALLBACK_QUOTE;
    return (await quoteResponse.json()) as { text: string; author: string };
  } catch {
    // Never let a third-party quote API take down the landing page
    return FALLBACK_QUOTE;
  }
}

export default async function App() {
  const quote = await getQuote();
  return (
    <div className="relative h-full overflow-y-auto overflow-x-hidden">
      <Image className="w-full h-auto md:hidden" src={BannerImage} alt="" priority />
      <div
        className={`flex h-full bg-no-repeat bg-right bg-fixed items-start md:items-center`}
      >
        <div className="md:w-1/2 xl:w-1/2">
          <div className="m-12">
            <h1 className="m-0 text-5xl font-bold tracking-tight">
              LiftHouse 🏋
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              Plan workouts, log every set, and watch your lifts climb.
            </p>
            <Divider />
            <p className="text-xl italic text-gray-500">{quote.text}</p>
            <p className="text-gray-400">— {quote.author}</p>
            <Divider />
            <Space size="middle">
              <Link href={"/account/login"}>
                <Button type="primary" size="large">
                  Log in
                </Button>
              </Link>
              <Link href={"/account/signup"}>
                <Button size="large">Sign up</Button>
              </Link>
            </Space>
            <DemoText />
          </div>
        </div>
        <div className="hidden md:flex absolute right-0 ">
          <Image
            alt="Self Made"
            src={BackgroundImage}
            placeholder="blur"
            style={{
              objectFit: "contain",
              objectPosition: "right bottom",
            }}
          />
        </div>
      </div>
    </div>
  );
}
