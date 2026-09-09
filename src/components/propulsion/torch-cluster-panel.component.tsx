import { type JSX, useEffect } from "react";
import { usePropulsionStore } from "../../stores/propulsion.store";
import { formatBurnTimer } from "../../utils/format-burn-timer.util";
import { TorchCard } from "./torch-card.component";

import "./torch-cluster-panel.component.css";

/**
 * Left-hand panel of the Propulsion console's conventional drive view: the
 * four-torch engine cluster grid, the deuterium slush fuel gauge, and a
 * footer strip showing the selected torch, remaining delta-v, and the
 * active burn timer, sourced from {@link usePropulsionStore}. Clicking a
 * torch card selects it; the burn button starts or stops a burn, which
 * advances the timer once per second and slowly consumes fuel.
 */
export function TorchClusterPanel(): JSX.Element {
  const torches = usePropulsionStore((state) => state.torches);
  const selectedTorchId = usePropulsionStore((state) => state.selectedTorchId);
  const fuelPercent = usePropulsionStore((state) => state.fuelPercent);
  const deltaVKmS = usePropulsionStore((state) => state.deltaVKmS);
  const burnActive = usePropulsionStore((state) => state.burnActive);
  const burnSeconds = usePropulsionStore((state) => state.burnSeconds);
  const selectTorch = usePropulsionStore((state) => state.selectTorch);
  const toggleBurn = usePropulsionStore((state) => state.toggleBurn);
  const tickBurn = usePropulsionStore((state) => state.tickBurn);

  useEffect(() => {
    if (!burnActive) return;
    const interval = setInterval(tickBurn, 1000);
    return () => clearInterval(interval);
  }, [burnActive, tickBurn]);

  const selectedTorch = torches.find((torch) => torch.id === selectedTorchId) ?? torches[0];

  return (
    <div className="torch-cluster-panel">
      <div className="torch-cluster-panel__grid">
        {torches.map((torch) => (
          <TorchCard
            key={torch.id}
            torch={torch}
            selected={torch.id === selectedTorchId}
            onSelect={() => selectTorch(torch.id)}
          />
        ))}
      </div>
      <div className="torch-cluster-panel__fuel">
        <div className="torch-cluster-panel__fuel-top">
          <span className="torch-cluster-panel__fuel-label">Deuterium Slush</span>
          <span className="torch-cluster-panel__fuel-value">{fuelPercent.toFixed(1)} %</span>
        </div>
        <div className="torch-cluster-panel__fuel-track">
          <div className="torch-cluster-panel__fuel-fill" style={{ width: `${fuelPercent}%` }} />
        </div>
      </div>
      <div className="torch-cluster-panel__footer">
        <span>{`ΔV remaining ${deltaVKmS} km/s`}</span>
        <span>
          {`Selected torch ${selectedTorch.label.replace("Torch ", "").toUpperCase()} · ${selectedTorch.hoursSinceService} h since service`}
        </span>
        <button type="button" className="torch-cluster-panel__burn-button" onClick={toggleBurn}>
          {burnActive ? `Burn ${formatBurnTimer(burnSeconds)}` : "Start Burn"}
        </button>
      </div>
    </div>
  );
}
