"use client";

import { motion } from "framer-motion";

export function BottomFadeInAnimation({
  children,
  className,
  animationHeight = "100%",
  animationDuration,
}: {
  children: React.ReactNode;
  className?: string;
  animationHeight?: string | number;
  animationDuration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: animationHeight as number, opacity: 1 }} //height 256px is equal to h-64 in tailwindcss
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: animationDuration, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
