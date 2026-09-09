import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { ConsoleViewPlaceholder } from "../components/common/console-view-placeholder.component";
import { ChannelControlPanel } from "../components/communications/channel-control-panel.component";
import { ChannelGrid } from "../components/communications/channel-grid.component";
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
        {isStateA ? <ConsoleViewPlaceholder title="Manual" /> : <ChannelControlPanel />}
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>
        {isStateA ? <ConsoleViewPlaceholder title="Spectrum" /> : <ChannelGrid />}
      </ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
