import type { JSX } from "react";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";

import "./reactor-shutdown-button.component.css";

/**
 * Full-width black button below the energy distribution panel: shuts the
 * reactor down (cutting power to all six systems) when online, or brings it
 * back online (restoring the prior allocations) when offline.
 */
export function ReactorShutdownButton(): JSX.Element {
  const isReactorOnline = useEnergyDistributionStore((state) => state.isReactorOnline);
  const shutDownReactor = useEnergyDistributionStore((state) => state.shutDownReactor);
  const restartReactor = useEnergyDistributionStore((state) => state.restartReactor);

  return (
    <button
      type="button"
      className="reactor-shutdown-button"
      onClick={isReactorOnline ? shutDownReactor : restartReactor}
    >
      {isReactorOnline ? "Emergency Shutdown" : "Restart Reactor"}
    </button>
  );
}
