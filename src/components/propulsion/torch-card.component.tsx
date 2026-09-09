import type { JSX } from "react";
import type { Torch } from "../../stores/propulsion.store";

import "./torch-card.component.css";

/** Props for {@link TorchCard}. */
export interface TorchCardProps {
  /** Torch reading to display. */
  torch: Torch;
  /** Whether this torch is the selected one. */
  selected: boolean;
  /** Called when the card is clicked, to select this torch. */
  onSelect: () => void;
}

/** Uppercase status text shown for a torch, e.g. "ONLINE" or "DERATED". */
function statusLabel(status: Torch["status"]): string {
  if (status === "online") return "ONLINE";
  if (status === "derated") return "DERATED";
  return "LOCKED";
}

/**
 * Single fusion torch readout: thrust percent and bar, nozzle temperature,
 * specific impulse, and operational status on the first row, pump speed and
 * gimbal deflection on the second. Clicking the card selects it as the
 * active torch shown in the {@link TorchClusterPanel} footer.
 */
export function TorchCard({ torch, selected, onSelect }: TorchCardProps): JSX.Element {
  return (
    <button
      type="button"
      className={["torch-card", selected && "torch-card--selected"].filter(Boolean).join(" ")}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <div className="torch-card__top">
        <span className="torch-card__label">{torch.label}</span>
        <span className="torch-card__percent">{torch.percent}%</span>
      </div>
      <div className="torch-card__track">
        <div className="torch-card__fill" style={{ width: `${torch.percent}%` }} />
      </div>
      <div className="torch-card__row">
        <span>Nozzle {torch.nozzleK.toLocaleString()} K</span>
        <span>ISP {torch.ispS.toLocaleString()} s</span>
        <span>{statusLabel(torch.status)}</span>
      </div>
      <div className="torch-card__spacer" />
      <div className="torch-card__row">
        <span>Pump {torch.pumpRpm.toLocaleString()} rpm</span>
        <span>Gimbal {torch.gimbal}</span>
      </div>
    </button>
  );
}
