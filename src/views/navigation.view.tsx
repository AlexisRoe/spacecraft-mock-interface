import type { JSX } from "react";
import { ConsoleGrid } from "../components/console-grid.component";
import { ConsoleHeader } from "../components/console-header.component";
import { ConsoleViewPlaceholder } from "../components/console-view-placeholder.component";

/** Navigation console view: attitude and star chart. */
export function NavigationView(): JSX.Element {
  return (
    <ConsoleGrid>
      <ConsoleGrid.Header>
        <ConsoleHeader
          title="Space Navigation"
          autopilotStatus="Autopilot following plotted course"
          manualStatus="Direct law · RCS + main drive"
        />
      </ConsoleGrid.Header>
      <ConsoleGrid.Left>
        <ConsoleViewPlaceholder title="Navigation" />
      </ConsoleGrid.Left>
      <ConsoleGrid.Right />
    </ConsoleGrid>
  );
}
