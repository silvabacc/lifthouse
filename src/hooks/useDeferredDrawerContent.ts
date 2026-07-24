"use client";

import { useEffect, useState } from "react";

/**
 * Defers mounting of heavy drawer/modal content until the open transition has
 * finished, so the animation runs on an idle main thread instead of competing
 * with an expensive mount (e.g. the @ant-design/plots chart bundle).
 *
 * Usage:
 *   const { contentReady, afterOpenChange } = useDeferredDrawerContent(open);
 *   <Drawer open={open} afterOpenChange={afterOpenChange}>
 *     {contentReady ? <HeavyCharts /> : <Skeleton />}
 *   </Drawer>
 */
export function useDeferredDrawerContent(open: boolean) {
  const [contentReady, setContentReady] = useState(false);

  // Reset when the drawer is closed via state (covers unmount-less closes)
  useEffect(() => {
    if (!open) setContentReady(false);
  }, [open]);

  const afterOpenChange = (isOpen: boolean) => {
    setContentReady(isOpen);
  };

  return { contentReady, afterOpenChange };
}
