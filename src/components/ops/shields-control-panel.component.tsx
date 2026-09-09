import type { JSX } from "react";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";
import { useShieldsStore } from "../../stores/shields.store";
import { ShieldQuadrantCard } from "./shield-quadrant-card.component";

import "./shields-control-panel.component.css";

/**
 * Left-hand panel of the Ops console's Defence view: a 2x2 grid of the four
 * shield quadrants (fore, aft, dorsal, ventral), each showing its energy
 * allocation and current charge, with a slider to redistribute energy across
 * the active quadrants and a button to activate or deactivate its emitter.
 * Deactivating a quadrant hands its share to the remaining active ones, and
 * reactivating re-splits the grid's energy evenly across whichever quadrants
 * are active, via {@link useShieldsStore}. The footer reports the reactor's
 * own allocation to the shield system as a whole (see
 * {@link useEnergyDistributionStore}) — with none, no quadrant can hold a
 * shield once raised, regardless of its internal allocation here.
 */
export function ShieldsControlPanel(): JSX.Element {
  const quadrants = useShieldsStore((state) => state.quadrants);
  const setAllocation = useShieldsStore((state) => state.setAllocation);
  const toggleActive = useShieldsStore((state) => state.toggleActive);

  const shieldEnergyPercent =
    useEnergyDistributionStore((state) => state.systems.find((system) => system.id === "shields"))
      ?.percent ?? 0;

  return (
    <div className="shields-control-panel">
      <div className="shields-control-panel__grid">
        {quadrants.map((quadrant) => (
          <ShieldQuadrantCard
            key={quadrant.id}
            quadrant={quadrant}
            onSetAllocation={(percent) => setAllocation(quadrant.id, percent)}
            onToggleActive={() => toggleActive(quadrant.id)}
          />
        ))}
      </div>
      <div className="shields-control-panel__footer">
        <span>Reactor Allocation</span>
        <span>{`${shieldEnergyPercent}%`}</span>
      </div>
    </div>
  );
}
