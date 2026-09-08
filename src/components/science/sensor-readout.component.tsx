import type { JSX } from "react";

import "./sensor-readout.component.css";

/** Props for {@link SensorReadout}. */
export interface SensorReadoutProps {
  /** Futuristic sci-fi designation for the sensor channel, e.g. "GRAVIMETRIC ARRAY". */
  title: string;
  /** Light grey narrative reading line, e.g. "SHIFT +18 mGal AT 03:40". */
  subtitle: string;
}

/** Single boxed sensor telemetry tile: a bold title over a light grey subtitle line. */
export function SensorReadout({ title, subtitle }: SensorReadoutProps): JSX.Element {
  return (
    <div className="sensor-readout">
      <span className="sensor-readout__title">{title}</span>
      <span className="sensor-readout__subtitle">{subtitle}</span>
    </div>
  );
}
