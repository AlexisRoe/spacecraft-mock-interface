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
 * Single boxed sensor telemetry tile, in two columns: the bare value on the
 * left, and the title (with its unit) plus context on the right.
 */
export function SensorReadout({ value, unit, title, subtitle }: SensorReadoutProps): JSX.Element {
  return (
    <div className="sensor-readout">
      <span className="sensor-readout__value">{value}</span>
      <span className="sensor-readout__details">
        <span className="sensor-readout__title">
          {title} <span className="sensor-readout__unit">{unit}</span>
        </span>
        <span className="sensor-readout__subtitle">{subtitle}</span>
      </span>
    </div>
  );
}
