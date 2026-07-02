import { Button, Divider, Space } from "antd";
import BannerImage from "./assets/banner.png";
import BackgroundImage from "./assets/selfmade.png";
import Image from "next/image";
import Link from "next/link";
import { DemoText } from "./components/demo/demo";

async function getQuote() {
  const quoteReponse = await fetch("https://stoic-quotes.com/api/quote");
  const quote = (await quoteReponse.json()) as {
    text: string;
    author: string;
  };
  return quote;
}

export default async function App() {
  const quote = await getQuote();
  return (
    <div className="relative h-full overflow-y-auto overflow-x-hidden">
      <Image className="w-full h-auto md:hidden" src={BannerImage} alt="" />
      <div
        className={`flex h-full bg-no-repeat bg-right bg-fixed items-start md:items-center`}
      >
        <div className="md:w-1/2 xl:w-1/2">
          <div className="m-12">
            <h1 className="text-5xl font-bold">LiftHouse 🏋</h1>
            <Divider />
            <p className="text-xl text-gray-500 italic">{quote.text}</p>
            <p className="text-gray-500">- {quote.author}</p>
            <Divider />
            <Space>
              <Link href={"/account/login"}>
                <Button type="primary">Log in</Button>
              </Link>
              <Link href={"/account/signup"}>
                <Button>New here? Sign up!</Button>
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
