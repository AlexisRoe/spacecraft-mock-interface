import type { JSX, KeyboardEvent, MouseEvent } from "react";
import { useSpacecraftStore } from "../../stores/spacecraft.store";

import "./thrust-dialer.component.css";

const TICKS = [100, 75, 50, 25, 0];

/** Percentage points at which the dial's scale draws a tick mark. */
function formatTick(tick: number): string {
  return tick.toString().padStart(3, "0");
}

/**
 * Vertical thrust dialer: tap anywhere on the scale to set a 0-100% thrust
 * value, shown as a striped fill on the bar and as a readout below it. The
 * value is persisted in the spacecraft store.
 */
export function ThrustDialer(): JSX.Element {
  const value = useSpacecraftStore((state) => state.manualThrustPercent);
  const setValue = useSpacecraftStore((state) => state.setManualThrustPercent);

  function handleSetFromPointer(event: MouseEvent<HTMLDivElement>): void {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = 1 - (event.clientY - rect.top) / rect.height;
    setValue(Math.round(Math.min(100, Math.max(0, ratio * 100))));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      setValue(Math.min(100, value + 1));
    } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      setValue(Math.max(0, value - 1));
    }
  }

  return (
    <div className="thrust-dialer">
      <div className="thrust-dialer__scale">
        <div
          className="thrust-dialer__bar"
          onClick={handleSetFromPointer}
          onKeyDown={handleKeyDown}
          role="slider"
          tabIndex={0}
          aria-label="Thrust"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
        >
          <div className="thrust-dialer__fill" style={{ height: `${value}%` }} />
        </div>
        <div className="thrust-dialer__ticks">
          {TICKS.map((tick) => (
            <span key={tick}>— {formatTick(tick)}</span>
          ))}
        </div>
      </div>
      <div className="thrust-dialer__readout">
        <div className="thrust-dialer__readout-label">Set</div>
        <div className="thrust-dialer__readout-value">{value}%</div>
      </div>
    </div>
  );
}
