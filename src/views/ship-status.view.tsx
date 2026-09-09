import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { EnergyDiagram } from "../components/ship-status/energy-diagram.component";
import { EnergyDistributionPanel } from "../components/ship-status/energy-distribution-panel.component";
import { ShipStatusOverview } from "../components/ship-status/ship-status-overview.component";
import { useViewState } from "../hooks/use-view-state.hook";

const HEADER = (
  <ConsoleHeader
    title="Ship Status"
    stateAStatus="Energy grid nominal"
    stateBStatus="Systems overview"
  />
);

/** Ship Status console view: energy (view-state-a) and overview (view-state-b). */
export function ShipStatusView(): JSX.Element {
  const { isStateA } = useViewState();

  if (isStateA) {
    return (
      <ConsoleGrid>
        <ConsoleGrid.Header>{HEADER}</ConsoleGrid.Header>
        <ConsoleGrid.Left>
          <EnergyDiagram />
        </ConsoleGrid.Left>
        <ConsoleGrid.Right>
          <EnergyDistributionPanel />
        </ConsoleGrid.Right>
      </ConsoleGrid>
    );
  }

  return (
    <ConsoleGrid variant="full">
      <ConsoleGrid.Header>{HEADER}</ConsoleGrid.Header>
      <ConsoleGrid.Content>
        <ShipStatusOverview />
      </ConsoleGrid.Content>
    </ConsoleGrid>
  );
}
