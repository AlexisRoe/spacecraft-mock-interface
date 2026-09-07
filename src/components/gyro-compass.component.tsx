import type { JSX } from "react";

import "./gyro-compass.component.css";

/** Props for {@link GyroCompass}. */
export interface GyroCompassProps {
  /** Bearing/elevation needle angle in degrees, 0 = pointing North (up). */
  angleDeg: number;
  /** Caption rendered in the top-left corner of the compass, e.g. gyro status. */
  caption: string;
}

const TICK_ANGLES = Array.from({ length: 24 }, (_, index) => index * 15);

/** Circular attitude gyro dial showing bearing/elevation, styled for e-ink. */
export function GyroCompass({ angleDeg, caption }: GyroCompassProps): JSX.Element {
  return (
    <div className="gyro-compass">
      <span className="gyro-compass__caption">{caption}</span>
      <svg
        className="gyro-compass__dial"
        viewBox="0 0 200 200"
        role="img"
        aria-label="Attitude gyro compass"
      >
        <circle className="gyro-compass__outer" cx="100" cy="100" r="95" />
        <circle className="gyro-compass__dashed-ring" cx="100" cy="100" r="80" />
        <circle className="gyro-compass__inner-ring" cx="100" cy="100" r="55" />
        <line className="gyro-compass__axis" x1="5" y1="100" x2="195" y2="100" />
        <line className="gyro-compass__axis" x1="100" y1="5" x2="100" y2="195" />
        {TICK_ANGLES.map((angle) => (
          <line
            key={angle}
            className="gyro-compass__tick"
            x1="100"
            y1="10"
            x2="100"
            y2="18"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
        <line
          className="gyro-compass__needle"
          x1="100"
          y1="100"
          x2="100"
          y2="45"
          transform={`rotate(${angleDeg} 100 100)`}
        />
        <circle className="gyro-compass__hub" cx="100" cy="100" r="7" />
      </svg>
    </div>
  );
}
