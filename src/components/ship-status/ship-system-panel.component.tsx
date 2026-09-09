import type { JSX } from "react";
import type { ShipSystem, ShipSystemId } from "../../stores/ship-systems.store";

import "./ship-system-panel.component.css";

/** Props for {@link ShipSystemPanel}. */
export interface ShipSystemPanelProps {
  /** All ship systems to render as buttons. */
  systems: ShipSystem[];
  /** Currently selected system, if any. */
  selectedSystem: ShipSystemId | null;
  /** Called with a system's id when its button is clicked. */
  onSelect: (id: ShipSystemId) => void;
}

/**
 * Grid of per-system status buttons: each shows the system's callout number,
 * label, and current value. The selected button renders black, marking the
 * corresponding compartment as highlighted on the {@link ShipDiagram}.
 */
export function ShipSystemPanel({
  systems,
  selectedSystem,
  onSelect,
}: ShipSystemPanelProps): JSX.Element {
  return (
    <div className="ship-system-panel">
      {systems.map((system) => (
        <button
          key={system.id}
          type="button"
          className={[
            "ship-system-panel__button",
            system.id === selectedSystem && "ship-system-panel__button--active",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-pressed={system.id === selectedSystem}
          onClick={() => onSelect(system.id)}
        >
          <span className="ship-system-panel__callout">{system.callout}</span>
          <span className="ship-system-panel__label">{system.label}</span>
          <span className="ship-system-panel__value">{system.value}%</span>
        </button>
      ))}
    </div>
  );
}
