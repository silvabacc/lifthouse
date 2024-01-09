"use client";

import { AnimatePresence, motion } from "framer-motion";

export function BottomFadeInAnimation({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 256, opacity: 1 }} //height 256px is equal to h-64 in tailwindcss
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
