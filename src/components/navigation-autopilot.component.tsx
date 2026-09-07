import type { JSX } from "react";
import { StatDisplay } from "./stat-display.component";

import "./navigation-autopilot.component.css";

function cells(labels: string[]): JSX.Element[] {
  return labels.map((label) => (
    <div className="navigation-autopilot__cell" key={label}>
      <StatDisplay label={label} value="--" />
    </div>
  ));
}

/** Left column content for the navigation view in autopilot mode. */
export function NavigationAutopilotLeft(): JSX.Element {
  return (
    <div className="navigation-autopilot-left">
      <div className="navigation-autopilot__row navigation-autopilot__row--primary" />
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-3">
        {cells(["Param 1", "Param 2", "Param 3"])}
      </div>
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-3">
        {cells(["Param 4", "Param 5", "Param 6"])}
      </div>
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-4">
        {cells(["Param 7", "Param 8", "Param 9", "Param 10"])}
      </div>
    </div>
  );
}

/** Right column content for the navigation view in autopilot mode. */
export function NavigationAutopilotRight(): JSX.Element {
  return (
    <div className="navigation-autopilot-right">
      <div className="navigation-autopilot__row navigation-autopilot__row--primary" />
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-4">
        {cells(["Param 1", "Param 2", "Param 3", "Param 4"])}
      </div>
      <div className="navigation-autopilot__row navigation-autopilot__row--cols-4">
        {cells(["Param 5", "Param 6", "Param 7", "Param 8"])}
      </div>
    </div>
  );
}
