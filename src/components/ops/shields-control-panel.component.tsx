import type { JSX } from "react";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { useShieldsStore } from "../../stores/shields.store";
import { ShieldQuadrantCard } from "./shield-quadrant-card.component";

import "./shields-control-panel.component.css";

/**
 * Left-hand panel of the Ops console's Defence view: a 2x2 grid of the four
 * shield quadrants (fore, aft, dorsal, ventral), each showing its energy
 * allocation (which reads as 0% whenever the grid is lowered — see
 * {@link ShieldQuadrantCard}), with a slider to redistribute energy across
 * the active quadrants and a button to activate or deactivate its emitter.
 * Deactivating a quadrant hands its share to the remaining active ones, and
 * reactivating re-splits the grid's energy evenly across whichever quadrants
 * are active, via {@link useShieldsStore}. Below the grid: a button to
 * re-split the grid's energy evenly across all active quadrants, and a
 * status card reporting whether the grid currently has energy to raise (see
 * {@link useEnergyDistributionStore} — with none allocated to shields, no
 * quadrant can hold a shield once raised, regardless of its internal
 * allocation here) and whether it's currently raised.
 */
export function ShieldsControlPanel(): JSX.Element {
  const quadrants = useShieldsStore((state) => state.quadrants);
  const raised = useShieldsStore((state) => state.raised);
  const setAllocation = useShieldsStore((state) => state.setAllocation);
  const toggleActive = useShieldsStore((state) => state.toggleActive);
  const distributeEvenly = useShieldsStore((state) => state.distributeEvenly);

  const shieldEnergyPercent =
    useEnergyDistributionStore((state) => state.systems.find((system) => system.id === "shields"))
      ?.percent ?? 0;
  const isReactorOnline = useEnergyDistributionStore((state) => state.isReactorOnline);

  const hasActiveQuadrant = quadrants.some((quadrant) => quadrant.active);
  const isAvailable = isReactorOnline && shieldEnergyPercent > 0 && hasActiveQuadrant;

  return (
    <div className="shields-control-panel">
      <div className="shields-control-panel__grid">
        {quadrants.map((quadrant) => (
          <ShieldQuadrantCard
            key={quadrant.id}
            quadrant={quadrant}
            raised={raised}
            onSetAllocation={(percent) => setAllocation(quadrant.id, percent)}
            onToggleActive={() => toggleActive(quadrant.id)}
          />
        ))}
      </div>
      <button
        type="button"
        className="shields-control-panel__distribute-button"
        onClick={distributeEvenly}
      >
        Distribute Energy Evenly
      </button>
      <div className="shields-control-panel__status">
        <span>Shields {isAvailable ? "Available" : "Unavailable"}</span>
        <span>{raised ? "Raised" : "Lowered"}</span>
      </div>
    </div>
  );
}
