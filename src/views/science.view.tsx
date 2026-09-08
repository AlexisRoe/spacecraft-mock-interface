import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { ConsoleViewPlaceholder } from "../components/common/console-view-placeholder.component";
import { SensorField } from "../components/science/sensor-field.component";
import type { SensorReadoutProps } from "../components/science/sensor-readout.component";
import { SensorReadoutPanel } from "../components/science/sensor-readout-panel.component";
import { useViewState } from "../hooks/use-view-state.hook";

const SENSOR_READOUTS: SensorReadoutProps[] = [
  { value: "+18", unit: "mGal", title: "Gravimetric Array", subtitle: "Shift detected at 03:40" },
  { value: "0.042", unit: "µSv/h", title: "Gamma Flux Monitor", subtitle: "Off aft hull" },
  { value: "3.11", unit: "mrem/day", title: "Cosmic Background Rad", subtitle: "Steady" },
  { value: "0.008", unit: "Sv/h", title: "Hull Dose Accumulator", subtitle: "Within limits" },
  { value: "1.284e6", unit: "ct/s", title: "Neutrino Detector", subtitle: "No flare" },
  { value: "44.6", unit: "cm⁻³", title: "Ion Density Probe", subtitle: "Particle count" },
  { value: "412", unit: "km/s", title: "Solar Wind Vane", subtitle: "Quiet sector" },
  { value: "18.9", unit: "nT", title: "Magnetometer Array", subtitle: "Field nominal" },
];

/** Science console view: sensors (view-state-a) and props (view-state-b). */
export function ScienceView(): JSX.Element {
  const { isStateA } = useViewState();

  return (
    <ConsoleGrid>
      <ConsoleGrid.Header>
        <ConsoleHeader
          title="Science"
          stateAStatus="Sensor sweep active"
          stateBStatus="Prop bay ready"
        />
      </ConsoleGrid.Header>
      <ConsoleGrid.Left>
        {isStateA ? (
          <SensorReadoutPanel readouts={SENSOR_READOUTS} />
        ) : (
          <ConsoleViewPlaceholder title="Props" />
        )}
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>
        {isStateA ? <SensorField /> : <ConsoleViewPlaceholder title="Probes" />}
      </ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
