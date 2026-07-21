/**
 * Entrance animation via CSS keyframes (opacity + transform only), replacing
 * the previous framer-motion version. Compositor-friendly — no per-frame JS —
 * and server-component compatible, so it adds no client bundle weight.
 */
export function PageAnimation({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`animate-page-in ${className}`}>{children}</div>;
}
