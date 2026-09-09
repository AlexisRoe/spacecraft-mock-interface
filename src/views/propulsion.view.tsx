import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { FtlControlPanel } from "../components/propulsion/ftl-control-panel.component";
import { FtlDiagram } from "../components/propulsion/ftl-diagram.component";
import { ReactorPowerPanel } from "../components/propulsion/reactor-power-panel.component";
import { TorchClusterPanel } from "../components/propulsion/torch-cluster-panel.component";
import { useViewState } from "../hooks/use-view-state.hook";

/** Propulsion console view: conventional engines (view-state-a) and FTL (view-state-b). */
export function PropulsionView(): JSX.Element {
  const { isStateA } = useViewState();

  return (
    <ConsoleGrid>
      <ConsoleGrid.Header>
        <ConsoleHeader
          title="Propulsion"
          stateAStatus="Conventional drive online"
          stateBStatus="FTL drive standby"
        />
      </ConsoleGrid.Header>
      <ConsoleGrid.Left>{isStateA ? <TorchClusterPanel /> : <FtlControlPanel />}</ConsoleGrid.Left>
      <ConsoleGrid.Right>{isStateA ? <ReactorPowerPanel /> : <FtlDiagram />}</ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
