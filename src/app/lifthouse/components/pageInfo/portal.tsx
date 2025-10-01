"use client";

import { Button } from "antd";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children?: JSX.Element;
  extra?: JSX.Element;
  title?: string;
};
export default function PageInfoPortal({ children, extra, title }: Props) {
  const [mounted, setMounted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => setMounted(true), []);

  const element = document.getElementById("page-info");

  return mounted && element ? (
    createPortal(
      <div className="pt-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className={`${showInfo ? "block" : "hidden"} sm:block`}>
          {children}
        </div>
        <div className="w-full overflow-x-auto">{extra}</div>
        {children && (
          <Button
            onClick={() => setShowInfo(!showInfo)}
            className={"block sm:hidden p-0 mt-2"}
            type="link"
          >
            {showInfo ? "Show less" : "Show More"}
          </Button>
        )}
      </div>,
      element
    )
  ) : (
    <></>
  );
}
