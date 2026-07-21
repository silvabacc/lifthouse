/** CSS-based layout entrance — see pageAnimation.tsx for rationale. */
export function LayoutAnimation({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`animate-fade-in h-full ${className}`}>{children}</div>;
}
