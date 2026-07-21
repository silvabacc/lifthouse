/**
 * Previously animated height 0 -> 100% with framer-motion — height is a
 * layout-triggering property, so every animation frame forced a reflow of the
 * entire subtree (the workout page's whole chart list). Now a CSS
 * opacity/transform entrance. Legacy props are accepted for call-site
 * compatibility but no longer drive layout animation.
 */
export function BottomFadeInAnimation({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  animationHeight?: string | number;
  animationDuration?: number;
}) {
  return <div className={`animate-page-in ${className}`}>{children}</div>;
}
