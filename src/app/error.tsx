"use client";

import { Button, Result } from "antd";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface in monitoring (Vercel captures console.error in logs)
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full items-center justify-center">
      <Result
        status="error"
        title="Something went wrong"
        subTitle="An unexpected error occurred. Your data is safe — try again."
        extra={
          <Button type="primary" onClick={() => reset()}>
            Try again
          </Button>
        }
      />
    </div>
  );
}
