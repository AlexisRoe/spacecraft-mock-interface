import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { ConsoleViewPlaceholder } from "../components/common/console-view-placeholder.component";
import { ShieldsControlPanel } from "../components/ops/shields-control-panel.component";
import { ShieldsDiagram } from "../components/ops/shields-diagram.component";
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
        {isStateA ? <ConsoleViewPlaceholder title="Weapons" /> : <ShieldsControlPanel />}
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>
        {isStateA ? <ConsoleViewPlaceholder title="Target Lock" /> : <ShieldsDiagram />}
      </ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
