"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Button, Divider, Space } from "antd";
import Image from "next/image";
import SelfMade from "./assets/selfmade.png";
import Banner from "./assets/banner.png";

const COMPACT_SCREEN = 850;

export default function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchQuote = async () => {
      const quoteReponse = await fetch("https://stoic-quotes.com/api/quote");
      const quote = (await quoteReponse.json()) as {
        text: string;
        author: string;
      };

      setQuote(quote.text);
      setAuthor(quote.author);
    };

    fetchQuote();
  }, []);

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

  return (
    <>
      {isSmallScreen && (
        <Image src={Banner} alt="" style={{ width: "100%", height: "auto" }} />
      )}
      <div
        className={styles.container}
        style={{
          backgroundImage: !isSmallScreen ? `url(${SelfMade.src})` : undefined,
          alignItems: !isSmallScreen ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            width: !isSmallScreen ? "50%" : undefined,
          }}
        >
          <div style={{}} className={styles.header}>
            <h1>LiftHouse 🏋</h1>
            <Divider />
            <p className={styles.caption}>{quote}</p>
            <p className={styles.caption}>- {author}</p>
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
          </div>
        </div>
      </div>
    </>
  );
}
