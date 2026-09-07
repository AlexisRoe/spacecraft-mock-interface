import type { JSX } from "react";
import { ConsoleGrid } from "../components/console-grid.component";
import { ConsoleHeader } from "../components/console-header.component";
import { ConsoleViewPlaceholder } from "../components/console-view-placeholder.component";
import {
  NavigationAutopilotLeft,
  NavigationAutopilotRight,
} from "../components/navigation-autopilot.component";
import { useSpacecraftStore } from "../stores/spacecraft.store";

/** Navigation console view: attitude and star chart. */
export function NavigationView(): JSX.Element {
  const controlMode = useSpacecraftStore((state) => state.controlMode);
  const isAutopilot = controlMode === "autopilot";

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
        {isAutopilot ? <NavigationAutopilotLeft /> : <ConsoleViewPlaceholder title="Navigation" />}
      </ConsoleGrid.Left>
      <ConsoleGrid.Right>{isAutopilot ? <NavigationAutopilotRight /> : null}</ConsoleGrid.Right>
    </ConsoleGrid>
  );
}
