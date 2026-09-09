import type { JSX, KeyboardEvent, MouseEvent } from "react";
import type { ShieldQuadrant } from "../../stores/shields.store";

import "./shield-quadrant-card.component.css";

/** Props for {@link ShieldQuadrantCard}. */
export interface ShieldQuadrantCardProps {
  /** Quadrant reading and allocation to display. */
  quadrant: ShieldQuadrant;
  /** Called with a new 0-100 allocation when the energy slider is set. */
  onSetAllocation: (percent: number) => void;
  /** Called to activate or deactivate this quadrant's emitter. */
  onToggleActive: () => void;
}

/** Sets `onSetAllocation` from a horizontal pointer position within `event`'s target. */
function setFromPointer(
  event: MouseEvent<HTMLDivElement>,
  onSetAllocation: (percent: number) => void,
): void {
  const rect = event.currentTarget.getBoundingClientRect();
  const ratio = (event.clientX - rect.left) / rect.width;
  onSetAllocation(Math.round(Math.min(100, Math.max(0, ratio * 100))));
}

/** Nudges the allocation up or down by one on arrow key presses. */
function nudgeOnArrowKeys(
  event: KeyboardEvent<HTMLDivElement>,
  percent: number,
  onSetAllocation: (percent: number) => void,
): void {
  if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    onSetAllocation(Math.min(100, percent + 1));
  } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    onSetAllocation(Math.max(0, percent - 1));
  }
}

/**
 * Single shield quadrant card: current energy allocation (as a slider) and
 * charge readout, plus an activate/deactivate toggle. Used in a 2x2 grid by
 * {@link ShieldsControlPanel}, one per quadrant. While inactive, the slider
 * is disabled and reads 0%, since {@link useShieldsStore} always redistributes
 * a deactivated quadrant's share to the others.
 */
export function ShieldQuadrantCard({
  quadrant,
  onSetAllocation,
  onToggleActive,
}: ShieldQuadrantCardProps): JSX.Element {
  const { label, percent, chargePercent, active } = quadrant;

  return (
    <div
      className={["shield-quadrant-card", !active && "shield-quadrant-card--inactive"]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="shield-quadrant-card__top">
        <span className="shield-quadrant-card__label">{label}</span>
        <span className="shield-quadrant-card__charge">
          {active ? `${Math.round(chargePercent)}%` : "OFF"}
        </span>
      </div>

      <div className="shield-quadrant-card__row-label">
        <span>Energy</span>
        <span>{`${percent}%`}</span>
      </div>
      <div
        className="shield-quadrant-card__slider"
        onClick={(event) => active && setFromPointer(event, onSetAllocation)}
        onKeyDown={(event) => active && nudgeOnArrowKeys(event, percent, onSetAllocation)}
        role="slider"
        tabIndex={active ? 0 : -1}
        aria-label={`${label} energy allocation`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-disabled={!active}
      >
        <div className="shield-quadrant-card__slider-fill" style={{ width: `${percent}%` }} />
      </div>

      <button
        type="button"
        className="shield-quadrant-card__toggle-button"
        onClick={onToggleActive}
        aria-pressed={active}
      >
        {active ? "Deactivate" : "Activate"}
      </button>
    </div>
  );
}
