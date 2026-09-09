import type { JSX, KeyboardEvent, MouseEvent } from "react";

import "./energy-dialer.component.css";

const TICKS = [100, 75, 50, 25, 0];

/** Percentage points at which the dial's scale draws a tick mark. */
function formatTick(tick: number): string {
  return tick.toString().padStart(3, "0");
}

/** Props for {@link EnergyDialer}. */
export interface EnergyDialerProps {
  /** Short uppercase label identifying the system this dialer allocates to. */
  label: string;
  /** Current allocation, from 0 to 100. */
  value: number;
  /** Called with the new allocation when the dialer is tapped or nudged. */
  onChange: (value: number) => void;
}

/**
 * Vertical power-allocation dialer: tap anywhere on the scale to set a
 * 0-100% share of the reactor's output, shown as a striped fill on the bar
 * and as a readout below it. Mirrors the manual navigation thrust dialer.
 */
export function EnergyDialer({ label, value, onChange }: EnergyDialerProps): JSX.Element {
  function handleSetFromPointer(event: MouseEvent<HTMLDivElement>): void {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = 1 - (event.clientY - rect.top) / rect.height;
    onChange(Math.round(Math.min(100, Math.max(0, ratio * 100))));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      onChange(Math.min(100, value + 1));
    } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      onChange(Math.max(0, value - 1));
    }
  }

  return (
    <div className="energy-dialer">
      <div className="energy-dialer__label">{label}</div>
      <div className="energy-dialer__scale">
        <div
          className="energy-dialer__bar"
          onClick={handleSetFromPointer}
          onKeyDown={handleKeyDown}
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
        >
          <div className="energy-dialer__fill" style={{ height: `${value}%` }} />
        </div>
        <div className="energy-dialer__ticks">
          {TICKS.map((tick) => (
            <span key={tick}>— {formatTick(tick)}</span>
          ))}
        </div>
      </div>
      <div className="energy-dialer__readout">
        <div className="energy-dialer__readout-label">Set</div>
        <div className="energy-dialer__readout-value">{value}%</div>
      </div>
    </div>
  );
}
