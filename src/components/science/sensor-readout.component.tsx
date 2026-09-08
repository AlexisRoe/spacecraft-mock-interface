import type { JSX } from "react";

import "./sensor-readout.component.css";

/** Props for {@link SensorReadout}. */
export interface SensorReadoutProps {
  /** Bare headline reading, shown large and bold, e.g. "+18". */
  value: string;
  /** Unit of measure for `value`, shown beside the title, e.g. "mGal". */
  unit: string;
  /** Futuristic sci-fi designation for the sensor channel, e.g. "GRAVIMETRIC ARRAY". */
  title: string;
  /** Light grey context line, e.g. "Shift detected at 03:40". */
  subtitle: string;
}

/**
 * Single boxed sensor telemetry tile: the bare value shown large across the
 * top, with the channel title (and its unit) and context line stacked below.
 */
export function SensorReadout({ value, unit, title, subtitle }: SensorReadoutProps): JSX.Element {
  return (
    <div className="sensor-readout">
      <span className="sensor-readout__title">{title}</span>
      <span className="sensor-readout__value">
        {value}
        <span className="sensor-readout__unit">{unit}</span>
      </span>
      <span className="sensor-readout__subtitle">{subtitle}</span>
    </div>
  );
}
