import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { ChannelControlPanel } from "../components/communications/channel-control-panel.component";
import { ChannelGrid } from "../components/communications/channel-grid.component";
import { CommsManualPanel } from "../components/communications/comms-manual-panel.component";
import { FrequencyBandDiagram } from "../components/communications/frequency-band-diagram.component";
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
        {isStateA ? <CommsManualPanel /> : <ChannelControlPanel />}
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>{isStateA ? <FrequencyBandDiagram /> : <ChannelGrid />}</ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
