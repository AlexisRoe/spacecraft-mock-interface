import type { JSX } from "react";
import { ConsoleGrid } from "../components/console-grid.component";
import { ConsoleHeader } from "../components/console-header.component";
import { ConsoleViewPlaceholder } from "../components/console-view-placeholder.component";
import { useViewState } from "../hooks/use-view-state.hook";

/** Ops console view: weapons (view-state-a) and defence (view-state-b). */
export function OpsView(): JSX.Element {
  const { isStateA } = useViewState();

  return (
    <ConsoleGrid>
      <ConsoleGrid.Header>
        <ConsoleHeader
          title="Ops"
          stateAStatus="Weapons systems armed"
          stateBStatus="Defence grid active"
        />
      </ConsoleGrid.Header>
      <ConsoleGrid.Left>
        <ConsoleViewPlaceholder title={isStateA ? "Weapons" : "Defence"} />
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>
        <ConsoleViewPlaceholder title={isStateA ? "Target Lock" : "Shield Grid"} />
      </ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
