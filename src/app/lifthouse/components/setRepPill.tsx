/**
 * Small indigo-tinted pill showing an exercise's target scheme, e.g. "3 × 8-12".
 * Shared across the workout flow so the scheme always reads the same way.
 */
type Props = {
  sets: number;
  reps: string | number;
  className?: string;
};

export function SetRepPill({ sets, reps, className = "" }: Props) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600 ${className}`}
    >
      {sets} × {reps}
    </span>
  );
}
