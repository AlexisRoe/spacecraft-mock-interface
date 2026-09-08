import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { ConsoleViewPlaceholder } from "../components/common/console-view-placeholder.component";
import { useViewState } from "../hooks/use-view-state.hook";

/** Ship Status console view: energy (view-state-a) and overview (view-state-b). */
export function ShipStatusView(): JSX.Element {
  const { isStateA } = useViewState();

  return (
    <ConsoleGrid>
      <ConsoleGrid.Header>
        <ConsoleHeader
          title="Ship Status"
          stateAStatus="Energy grid nominal"
          stateBStatus="Systems overview"
        />
      </ConsoleGrid.Header>
      <ConsoleGrid.Left>
        <ConsoleViewPlaceholder title={isStateA ? "Energy" : "Overview"} />
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>
        <ConsoleViewPlaceholder title={isStateA ? "Reactor Grid" : "Life Support"} />
      </ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
