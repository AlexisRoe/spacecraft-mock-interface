import type { JSX } from "react";

import "./tokamak-gauge.component.css";

/** Props for {@link TokamakGauge}. */
export interface TokamakGaugeProps {
  /** Reactor core output, from 0 to 100. */
  percent: number;
}

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Circular reactor core output gauge: an SVG ring filled clockwise to
 * `percent`, with a solid center dot standing in for the plasma core.
 */
export function TokamakGauge({ percent }: TokamakGaugeProps): JSX.Element {
  const filled = (Math.min(100, Math.max(0, percent)) / 100) * CIRCUMFERENCE;

  return (
    <svg className="tokamak-gauge" viewBox="0 0 96 96" aria-hidden="true">
      <circle
        className="tokamak-gauge__track"
        cx="48"
        cy="48"
        r={RADIUS}
        strokeDasharray="2 4"
        fill="none"
      />
      <circle
        className="tokamak-gauge__fill"
        cx="48"
        cy="48"
        r={RADIUS}
        strokeDasharray={`${filled} ${CIRCUMFERENCE - filled}`}
        transform="rotate(-90 48 48)"
        fill="none"
      />
      <circle className="tokamak-gauge__core" cx="48" cy="48" r="11" />
    </svg>
  );
}
