import type { JSX } from "react";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { EnergyDialer } from "./energy-dialer.component";
import { ReactorShutdownButton } from "./reactor-shutdown-button.component";

import "./energy-distribution-panel.component.css";

/**
 * Right-hand panel of the Ship Status view's energy state: one dialer per
 * main system, letting the captain set its share of the reactor's output,
 * and the reactor shutdown/restart control below them. Setting one dialer
 * proportionally rescales the other five via {@link useEnergyDistributionStore},
 * so the total never exceeds 100%. While the reactor is shut down, the
 * dialers read 0% and ignore input.
 */
export function EnergyDistributionPanel(): JSX.Element {
  const systems = useEnergyDistributionStore((state) => state.systems);
  const isReactorOnline = useEnergyDistributionStore((state) => state.isReactorOnline);
  const setAllocation = useEnergyDistributionStore((state) => state.setAllocation);

  return (
    <div className="energy-distribution-panel">
      <div className="energy-distribution-panel__dialers">
        {systems.map((system) => (
          <EnergyDialer
            key={system.id}
            label={system.label}
            value={system.percent}
            onChange={(value) => setAllocation(system.id, value)}
            disabled={!isReactorOnline}
          />
        ))}
      </div>
      <ReactorShutdownButton />
    </div>
  );
}
