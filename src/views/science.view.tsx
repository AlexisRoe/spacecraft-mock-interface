import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { ConsoleViewPlaceholder } from "../components/common/console-view-placeholder.component";
import { useViewState } from "../hooks/use-view-state.hook";

/** Science console view: sensors (view-state-a) and props (view-state-b). */
export function ScienceView(): JSX.Element {
  const { isStateA } = useViewState();

  return (
    <ConsoleGrid>
      <ConsoleGrid.Header>
        <ConsoleHeader
          title="Science"
          stateAStatus="Sensor sweep active"
          stateBStatus="Prop bay ready"
        />
      </ConsoleGrid.Header>
      <ConsoleGrid.Left>
        <ConsoleViewPlaceholder title={isStateA ? "Sensors" : "Props"} />
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>
        <ConsoleViewPlaceholder title={isStateA ? "Particles" : "Probes"} />
      </ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
