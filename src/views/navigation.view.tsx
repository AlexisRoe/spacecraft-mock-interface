import type { JSX } from "react";
import { ConsoleGrid } from "../components/console-grid.component";
import { ConsoleHeader } from "../components/console-header.component";
import {
  NavigationAutopilotLeft,
  NavigationAutopilotRight,
} from "../components/navigation-autopilot.component";
import { StatDisplay } from "../components/stat-display.component";
import { ThrustVectorPanel } from "../components/thrust-vector-panel.component";
import { useSpacecraftStore } from "../stores/spacecraft.store";

import "./navigation.view.css";

/** Navigation console view: attitude and star chart. */
export function NavigationView(): JSX.Element {
  const controlMode = useSpacecraftStore((state) => state.controlMode);
  const isAutopilot = controlMode === "autopilot";

  const header = (
    <ConsoleGrid.Header>
      <ConsoleHeader
        title="Space Navigation"
        autopilotStatus="Autopilot following plotted course"
        manualStatus="Direct law · RCS + main drive"
      />
    </ConsoleGrid.Header>
  );

  if (isAutopilot) {
    return (
      <ConsoleGrid>
        {header}
        <ConsoleGrid.Left>
          <NavigationAutopilotLeft />
        </ConsoleGrid.Left>
        <ConsoleGrid.Right>
          <NavigationAutopilotRight />
        </ConsoleGrid.Right>
      </ConsoleGrid>
    );
  }

  return (
    <ConsoleGrid variant="manual">
      {header}
      <ConsoleGrid.Primary>
        <div className="navigation-view__column">
          <div />
          <span className="navigation-view__column-label">Flight Path</span>
        </div>
      </ConsoleGrid.Primary>
      <ConsoleGrid.Secondary>
        <div className="navigation-view__column">
          <div />
          <span className="navigation-view__column-label">Trajectory</span>
        </div>
      </ConsoleGrid.Secondary>
      <ConsoleGrid.Tertiary>
        <ThrustVectorPanel />
      </ConsoleGrid.Tertiary>
      <ConsoleGrid.Footer>
        <div className="navigation-view__footer-row">
          <div className="navigation-view__footer-cell">
            <StatDisplay label="Stick Authority" value="HELM 01" />
          </div>
          <div className="navigation-view__footer-cell">
            <StatDisplay label="Flight Envelope" value="WITHIN LIMITS" />
          </div>
          <div className="navigation-view__footer-cell">
            <StatDisplay label="FTL Interlock" value="INHIBITED" />
          </div>
          <div className="navigation-view__footer-cell">
            <StatDisplay label="RCS Propellant" value="78.2 %" />
          </div>
        </div>
      </ConsoleGrid.Footer>
    </ConsoleGrid>
  );
}
