import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { ConsoleViewPlaceholder } from "../components/common/console-view-placeholder.component";
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
      <ConsoleGrid.Left>
        <ConsoleViewPlaceholder title={isStateA ? "Conventional" : "FTL"} />
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>
        <ConsoleViewPlaceholder title={isStateA ? "Reactor" : "Warp Field"} />
      </ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
