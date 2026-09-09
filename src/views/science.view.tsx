import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { ProbeDeploymentDiagram } from "../components/science/probe-deployment-diagram.component";
import { ProbeDeploymentPanel } from "../components/science/probe-deployment-panel.component";
import { SensorField } from "../components/science/sensor-field.component";
import type { SensorReadoutProps } from "../components/science/sensor-readout.component";
import { SensorReadoutPanel } from "../components/science/sensor-readout-panel.component";
import { useSensorTelemetry } from "../hooks/use-sensor-telemetry.hook";
import { useViewState } from "../hooks/use-view-state.hook";

const SENSOR_READOUTS: SensorReadoutProps[] = [
  { value: "+18", unit: "mGal", title: "Gravimetric Array", subtitle: "Shift detected at 03:40" },
  { value: "0.042", unit: "µSv/h", title: "Gamma Flux Monitor", subtitle: "Off aft hull" },
  { value: "3.11", unit: "mrem/day", title: "Cosmic Background Rad", subtitle: "Steady" },
  { value: "1.284e6", unit: "ct/s", title: "Neutrino Detector", subtitle: "No flare" },
  { value: "412", unit: "km/s", title: "Solar Wind Vane", subtitle: "Quiet sector" },
  { value: "18.9", unit: "nT", title: "Magnetometer Array", subtitle: "Field nominal" },
];

/** Science console view: sensors (view-state-a) and props (view-state-b). */
export function ScienceView(): JSX.Element {
  const { isStateA } = useViewState();
  const readouts = useSensorTelemetry(SENSOR_READOUTS);

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
        {isStateA ? <SensorReadoutPanel readouts={readouts} /> : <ProbeDeploymentPanel />}
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>
        {isStateA ? <SensorField /> : <ProbeDeploymentDiagram />}
      </ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
