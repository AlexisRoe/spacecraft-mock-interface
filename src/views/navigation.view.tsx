import type { JSX } from "react";
import { ConsoleGrid } from "../components/common/console-grid.component";
import { ConsoleHeader } from "../components/common/console-header.component";
import { StatDisplay } from "../components/common/stat-display.component";
import { ManualSteeringWheel } from "../components/navigation/manual-steering-wheel.component";
import {
  NavigationAutopilotLeft,
  NavigationAutopilotRight,
} from "../components/navigation/navigation-autopilot.component";
import { ThrustDialer } from "../components/navigation/thrust-dialer.component";
import { ThrustVectorPanel } from "../components/navigation/thrust-vector-panel.component";
import { useViewState } from "../hooks/use-view-state.hook";
import { type FlightAction, useSpacecraftStore } from "../stores/spacecraft.store";

import "./navigation.view.css";

const FLIGHT_ACTIONS: FlightAction[] = ["NULL RATES", "ALIGN TO WAYPOINT"];

/** Navigation console view: automatic (view-state-a) and manual (view-state-b). */
export function NavigationView(): JSX.Element {
  const { isStateA: isAutomatic } = useViewState();
  const flightAction = useSpacecraftStore((state) => state.manualFlightAction);
  const setFlightAction = useSpacecraftStore((state) => state.setManualFlightAction);

  const header = (
    <ConsoleGrid.Header>
      <ConsoleHeader
        title="Space Navigation"
        stateAStatus="Autopilot following plotted course"
        stateBStatus="Direct law · RCS + main drive"
      />
    </ConsoleGrid.Header>
  );

  if (isAutomatic) {
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
