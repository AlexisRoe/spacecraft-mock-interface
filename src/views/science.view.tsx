import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { ConsoleViewPlaceholder } from "../components/common/console-view-placeholder.component";
import { SensorField } from "../components/science/sensor-field.component";
import type { SensorReadoutProps } from "../components/science/sensor-readout.component";
import { SensorReadoutPanel } from "../components/science/sensor-readout-panel.component";
import { useViewState } from "../hooks/use-view-state.hook";

const SENSOR_READOUTS: SensorReadoutProps[] = [
  { title: "Gravimetric Array", subtitle: "Shift +18 mGal at 03:40" },
  { title: "Gamma Flux Monitor", subtitle: "0.042 µSv/h off aft hull" },
  { title: "Cosmic Background Rad", subtitle: "3.11 mrem/day, steady" },
  { title: "Hull Dose Accumulator", subtitle: "0.008 Sv/h, within limits" },
  { title: "Neutrino Detector", subtitle: "1.284e6 ct/s, no flare" },
  { title: "Ion Density Probe", subtitle: "44.6 particles/cm³" },
  { title: "Solar Wind Vane", subtitle: "412 km/s, quiet sector" },
  { title: "Magnetometer Array", subtitle: "18.9 nT, field nominal" },
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
