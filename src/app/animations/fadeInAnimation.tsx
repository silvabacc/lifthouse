/** CSS-based fade-in — see pageAnimation.tsx for rationale. */
export function FadeInAnimation({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`animate-fade-in ${className}`}>{children}</div>;
}
