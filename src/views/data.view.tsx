import type { JSX } from "react";
import { ConsoleGrid } from "../components/console-grid.component";
import { ConsoleHeader } from "../components/console-header.component";
import { ConsoleViewPlaceholder } from "../components/console-view-placeholder.component";
import { useViewState } from "../hooks/use-view-state.hook";

/** Data console view: records/logs (view-state-a) and code (view-state-b). */
export function DataConsoleView(): JSX.Element {
  const { isStateA } = useViewState();

  return (
    <ConsoleGrid>
      <ConsoleGrid.Header>
        <ConsoleHeader
          title="Data"
          stateAStatus="Log stream live"
          stateBStatus="Code console ready"
        />
      </ConsoleGrid.Header>
      <ConsoleGrid.Left>
        <ConsoleViewPlaceholder title={isStateA ? "Logs" : "Code"} />
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>
        <ConsoleViewPlaceholder title={isStateA ? "Database Search" : "Diagnostics"} />
      </ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
