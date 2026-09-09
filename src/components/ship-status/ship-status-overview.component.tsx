import type { JSX } from "react";
import { useShipSystemsStore } from "../../stores/ship-systems.store";
import { ShipDiagram } from "./ship-diagram.component";
import { ShipSystemPanel } from "./ship-system-panel.component";

import "./ship-status-overview.component.css";

/**
 * Ship Status overview: the full-width ship deck plan on top, with a grid of
 * per-system status buttons below, sourced from {@link useShipSystemsStore}.
 * Selecting a button highlights the corresponding compartment on the
 * diagram.
 */
export function ShipStatusOverview(): JSX.Element {
  const systems = useShipSystemsStore((state) => state.systems);
  const selectedSystem = useShipSystemsStore((state) => state.selectedSystem);
  const toggleSystem = useShipSystemsStore((state) => state.toggleSystem);

  return (
    <div className="ship-status-overview">
      <div className="ship-status-overview__diagram">
        <ShipDiagram highlighted={selectedSystem} />
      </div>
      <ShipSystemPanel systems={systems} selectedSystem={selectedSystem} onSelect={toggleSystem} />
    </div>
  );
}
