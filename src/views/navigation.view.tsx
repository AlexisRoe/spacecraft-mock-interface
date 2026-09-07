import { type JSX, useState } from "react";
import { ConsoleGrid } from "../components/console-grid.component";
import { ConsoleHeader } from "../components/console-header.component";
import { ManualSteeringWheel } from "../components/manual-steering-wheel.component";
import {
  NavigationAutopilotLeft,
  NavigationAutopilotRight,
} from "../components/navigation-autopilot.component";
import { StatDisplay } from "../components/stat-display.component";
import { ThrustDialer } from "../components/thrust-dialer.component";
import { ThrustVectorPanel } from "../components/thrust-vector-panel.component";
import { useSpacecraftStore } from "../stores/spacecraft.store";

import "./navigation.view.css";

/** Flight action selectable in the manual navigation view's primary column. */
type FlightAction = "NULL RATES" | "ALIGN TO WAYPOINT";

const FLIGHT_ACTIONS: FlightAction[] = ["NULL RATES", "ALIGN TO WAYPOINT"];

/** Navigation console view: attitude and star chart. */
export function NavigationView(): JSX.Element {
  const controlMode = useSpacecraftStore((state) => state.controlMode);
  const isAutopilot = controlMode === "autopilot";
  const [flightAction, setFlightAction] = useState<FlightAction>("NULL RATES");

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
          <ManualSteeringWheel />
          <div className="navigation-view__primary-actions">
            {FLIGHT_ACTIONS.map((action) => (
              <button
                key={action}
                type="button"
                className={[
                  "navigation-view__primary-action",
                  action === flightAction && "navigation-view__primary-action--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={action === flightAction}
                onClick={() => setFlightAction(action)}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </ConsoleGrid.Primary>
      <ConsoleGrid.Secondary>
        <ThrustDialer />
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
