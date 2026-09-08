import type { JSX } from "react";
import { SensorReadout, type SensorReadoutProps } from "./sensor-readout.component";

import "./sensor-readout-panel.component.css";

/** Props for {@link SensorReadoutPanel}. */
export interface SensorReadoutPanelProps {
  /** Sensor readout tiles to display in the grid. */
  readouts: SensorReadoutProps[];
}

/**
 * Grid of boxed sensor readout tiles (radiation, particle flux, etc.), each
 * showing a bold title over a light grey narrative subtitle line.
 */
export function SensorReadoutPanel({ readouts }: SensorReadoutPanelProps): JSX.Element {
  return (
    <div className="sensor-readout-panel">
      {readouts.map((readout) => (
        <SensorReadout key={readout.title} {...readout} />
      ))}
    </div>
  );
}
