import type { JSX } from "react";

import "./stat-display.component.css";

/** Props for {@link StatDisplay}. */
export interface StatDisplayProps {
  /** Short uppercase label describing the stat. */
  label: string;
  /** Current value of the stat. */
  value: string;
  /** Additional class name(s) applied to the root element. */
  className?: string;
}

/** Labeled telemetry readout, e.g. "SHIP TIME" / "14:07:32". */
export function StatDisplay({ label, value, className }: StatDisplayProps): JSX.Element {
  return (
    <div className={["stat-display", className].filter(Boolean).join(" ")}>
      <span className="stat-display__label">{label}</span>
      <span className="stat-display__value">{value}</span>
    </div>
  );
}
