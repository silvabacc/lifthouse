"use client";

import LifthouseLogo from "./assets/Lifthouse_logo_black.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Button, Space, Spin } from "antd";

const SMALL_SCREEN_WIDTH = 850;

export default function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchQuote = async () => {
      setLoading(true);
      const quoteReponse = await fetch("https://stoic-quotes.com/api/quote");
      const quote = (await quoteReponse.json()) as {
        text: string;
        author: string;
      };

      setQuote(`${quote.text} - ${quote.author}`);
      setLoading(false);
    };

    fetchQuote();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < SMALL_SCREEN_WIDTH);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const borderOptions = isSmallScreen
    ? {
        borderColor: "black",
        border: "2px",
        borderStyle: "solid",
      }
    : {};

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <Image
          alt=""
          style={{ backgroundColor: "white" }}
          src={LifthouseLogo}
          width={200}
        />
      </div>
      <div className={styles.main}>
        <div
          style={{ width: isSmallScreen ? undefined : "50%", ...borderOptions }}
          className={styles.header}
        >
          <h1>Enjoy the journey, not the destination</h1>
          <div className={styles.loading}>{loading && <Spin />}</div>
          <p className={styles.caption}>{quote}</p>
          <Space>
            <Button onClick={() => router.push("/account/login")}>
              Log in
            </Button>
            <Button
              className={styles.button}
              onClick={() => router.push("/account/signup")}
            >
              New here? Sign up!
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
