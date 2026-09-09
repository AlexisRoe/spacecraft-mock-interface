import type { JSX } from "react";
import { useEnergyDistributionStore } from "../../stores/energy-distribution.store";

import "./energy-diagram.component.css";

/** Formats a share of the reactor's output in gigawatt-hours, e.g. "255.0". */
function formatGwh(reactorOutputGwh: number, percent: number): string {
  return ((reactorOutputGwh * percent) / 100).toFixed(1);
}

/**
 * Left-hand diagram of the Ship Status view's energy state: the reactor's
 * total output, and a horizontal bar per system sized to its current share,
 * sourced from {@link useEnergyDistributionStore}.
 */
export function EnergyDiagram(): JSX.Element {
  const reactorOutputGwh = useEnergyDistributionStore((state) => state.reactorOutputGwh);
  const systems = useEnergyDistributionStore((state) => state.systems);
  const isReactorOnline = useEnergyDistributionStore((state) => state.isReactorOnline);
  const allocated = isReactorOnline ? systems.reduce((sum, system) => sum + system.percent, 0) : 0;

  return (
    <div className="energy-diagram">
      <div className="energy-diagram__header">
        <div>
          <div className="energy-diagram__header-label">Reactor Output</div>
          <div className="energy-diagram__header-value">
            {isReactorOnline ? reactorOutputGwh.toFixed(0) : "0"}
            <span className="energy-diagram__header-unit">GWH max</span>
          </div>
        </div>
        <div className="energy-diagram__header-allocated">
          <div className="energy-diagram__header-label">Allocated</div>
          <div className="energy-diagram__header-value">
            {allocated}
            <span className="energy-diagram__header-unit">%</span>
          </div>
        </div>
      </div>
      <div className="energy-diagram__bars">
        {systems.map((system) => {
          const percent = isReactorOnline ? system.percent : 0;
          return (
            <div className="energy-diagram__row" key={system.id}>
              <span className="energy-diagram__row-label">{system.label}</span>
              <div className="energy-diagram__row-line">
                <div className="energy-diagram__row-track">
                  <div className="energy-diagram__row-fill" style={{ width: `${percent}%` }} />
                </div>
                <span className="energy-diagram__row-value">
                  {percent}%
                  <span className="energy-diagram__row-gwh">
                    {formatGwh(reactorOutputGwh, percent)} GWH
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
