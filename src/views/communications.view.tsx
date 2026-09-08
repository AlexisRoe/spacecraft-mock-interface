import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { ConsoleViewPlaceholder } from "../components/common/console-view-placeholder.component";
import { useViewState } from "../hooks/use-view-state.hook";

/** Communications console view: manual (view-state-a) and channels (view-state-b). */
export function CommunicationsView(): JSX.Element {
  const { isStateA } = useViewState();

  return (
    <ConsoleGrid>
      <ConsoleGrid.Header>
        <ConsoleHeader
          title="Communications"
          stateAStatus="Manual channel control"
          stateBStatus="Channel scan active"
        />
      </ConsoleGrid.Header>
      <ConsoleGrid.Left>
        <ConsoleViewPlaceholder title={isStateA ? "Manual" : "Channels"} />
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>
        <ConsoleViewPlaceholder title={isStateA ? "Spectrum" : "Audio"} />
      </ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
