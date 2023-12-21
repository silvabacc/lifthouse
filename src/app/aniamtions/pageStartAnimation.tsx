"use client";

import { motion, AnimatePresence } from "framer-motion";

export function PageStartAnimation({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
