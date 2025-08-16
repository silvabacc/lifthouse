"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Divider, Space } from "antd";
import Image from "next/image";
import SelfMade from "./assets/selfmade.png";
import Banner from "./assets/banner.png";
import { LayoutAnimation } from "./aniamtions/layoutAnimation";
import { DemoText } from "./components/demo/demo";

const COMPACT_SCREEN = 850;

type Props = {
  quote?: string;
  author?: string;
};

export default function LandingPage({ quote, author }: Props) {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < COMPACT_SCREEN);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundImage =
    isSmallScreen !== undefined
      ? !isSmallScreen
        ? `url(${SelfMade.src})`
        : undefined
      : undefined;

  return (
    <LayoutAnimation className="h-full">
      {isSmallScreen && <Image src={Banner} alt="" className="w-full h-auto" />}
      <div
        className={`flex h-full bg-no-repeat bg-right bg-fixed ${
          !isSmallScreen ? "items-center" : "items-start"
        }`}
        style={{
          backgroundImage,
          backgroundSize: "contain",
        }}
      >
        <div className={`${!isSmallScreen ? "w-1/2" : ""}`}>
          <div className="m-12">
            <h1 className="text-5xl font-bold">LiftHouse 🏋</h1>
            <Divider />
            <p className="text-xl text-gray-500 italic">{quote}</p>
            <p className="text-right text-gray-500 ">- {author}</p>
            <Divider />
            <Space>
              <Button
                type="primary"
                onClick={() => router.push("/account/login")}
              >
                Log in
              </Button>
              <Button onClick={() => router.push("/account/signup")}>
                New here? Sign up!
              </Button>
            </Space>
            <DemoText />
          </div>
        </div>
      </div>
    </LayoutAnimation>
  );
}
