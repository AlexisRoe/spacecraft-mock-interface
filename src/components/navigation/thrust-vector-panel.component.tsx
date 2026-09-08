import type { JSX } from "react";
import { useSpacecraftStore } from "../../stores/spacecraft.store";
import { truncate } from "../../utils/truncate.util";

import "./thrust-vector-panel.component.css";

/** A selectable RCS thruster firing direction, e.g. "STBD +Y". */
interface ThrustDirection {
  /** Direction name, e.g. "STBD". */
  label: string;
  /** Body-frame axis, e.g. "+Y". */
  axis: string;
}

const THRUST_DIRECTIONS: ThrustDirection[] = [
  { label: "DORSAL", axis: "+Z" },
  { label: "VENTRAL", axis: "−Z" },
  { label: "PORT", axis: "−Y" },
  { label: "STBD", axis: "+Y" },
  { label: "FWD", axis: "+X" },
  { label: "AFT", axis: "−X" },
];

/**
 * RCS thruster direction selector: a 2x3 grid of firing-direction buttons
 * (active direction shown inverted) above a velocity/impulse stat readout.
 * The active direction is persisted in the spacecraft store.
 */
export function ThrustVectorPanel(): JSX.Element {
  const activeIndex = useSpacecraftStore((state) => state.manualThrustDirectionIndex);
  const setActiveIndex = useSpacecraftStore((state) => state.setManualThrustDirectionIndex);
  const active = THRUST_DIRECTIONS[activeIndex];

  return (
    <div className="thrust-vector-panel">
      <div className="thrust-vector-panel__grid">
        {THRUST_DIRECTIONS.map((direction, index) => (
          <button
            key={direction.label}
            type="button"
            className={[
              "thrust-vector-panel__button",
              index === activeIndex && "thrust-vector-panel__button--active",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {direction.label} {direction.axis}
          </button>
        ))}
      </div>
      <div className="thrust-vector-panel__stats">
        <div className="thrust-vector-panel__stat">
          <span className="thrust-vector-panel__stat-label">Velocity</span>
          <span className="thrust-vector-panel__stat-value">34.4 km/s</span>
        </div>
        <div className="thrust-vector-panel__stat">
          <span className="thrust-vector-panel__stat-label">Accel</span>
          <span className="thrust-vector-panel__stat-value">0.735 g</span>
        </div>
        <div className="thrust-vector-panel__stat">
          <span className="thrust-vector-panel__stat-label">Last Impulse</span>
          <span className="thrust-vector-panel__stat-value">
            {truncate(active.label, 4)} {active.axis}
          </span>
        </div>
        <div className="thrust-vector-panel__stat">
          <span className="thrust-vector-panel__stat-label">Course Dev.</span>
          <span className="thrust-vector-panel__stat-value">0.0°</span>
        </div>
      </div>
    </div>
  );
}
