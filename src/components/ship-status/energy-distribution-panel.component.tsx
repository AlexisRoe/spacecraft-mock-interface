import type { JSX } from "react";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { EnergyDialer } from "./energy-dialer.component";

import "./energy-distribution-panel.component.css";

/**
 * Right-hand panel of the Ship Status view's energy state: one dialer per
 * main system, letting the captain set its share of the reactor's output.
 * Setting one dialer proportionally rescales the other five via
 * {@link useEnergyDistributionStore}, so the total never exceeds 100%.
 */
export function EnergyDistributionPanel(): JSX.Element {
  const systems = useEnergyDistributionStore((state) => state.systems);
  const setAllocation = useEnergyDistributionStore((state) => state.setAllocation);

  return (
    <div className="energy-distribution-panel">
      {systems.map((system) => (
        <EnergyDialer
          key={system.id}
          label={system.label}
          value={system.percent}
          onChange={(value) => setAllocation(system.id, value)}
        />
      ))}
    </div>
  );
}
