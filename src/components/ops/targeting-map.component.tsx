import type { JSX, MouseEvent } from "react";
import { useWeaponsStore } from "../../stores/weapons.store";

import "./targeting-map.component.css";

/** Formats a range in kilometers, switching to megameters above 1000 km. */
function formatRange(rangeKm: number): string {
  return rangeKm >= 1000 ? `${(rangeKm / 1000).toFixed(2)} Mm` : `${rangeKm} km`;
}

/**
 * Right-hand panel of the Ops console's Weapons view: a starmap-style
 * targeting grid with a centered reticle, a marker for the selected contact,
 * and a bottom rail of the three preset contacts plus a firing-solution
 * summary. Sourced from {@link useWeaponsStore}. Clicking anywhere on the
 * grid designates a custom target at that point; clicking a contact card
 * selects that preset target instead. Either resets any in-progress lock.
 */
export function TargetingMap(): JSX.Element {
  const targets = useWeaponsStore((state) => state.targets);
  const selectedTargetId = useWeaponsStore((state) => state.selectedTargetId);
  const salvoMode = useWeaponsStore((state) => state.salvoMode);
  const lockStatus = useWeaponsStore((state) => state.lockStatus);
  const selectTarget = useWeaponsStore((state) => state.selectTarget);

  const target = targets.find((candidate) => candidate.id === selectedTargetId) ?? null;

  function handleGridClick(event: MouseEvent<HTMLButtonElement>): void {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    let closest = targets[0];
    let closestDistance = Number.POSITIVE_INFINITY;
    for (const candidate of targets) {
      const distance = (candidate.position.x - x) ** 2 + (candidate.position.y - y) ** 2;
      if (distance < closestDistance) {
        closest = candidate;
        closestDistance = distance;
      }
    }
    selectTarget(closest.id);
  }

  return (
    <div className="targeting-map">
      <div className="targeting-map__header">
        <div className="targeting-map__header-left">
          {target
            ? `${target.allegiance.toUpperCase()} · ${target.designation.toUpperCase()} · ${target.allegiance.toUpperCase()}`
            : "NO TARGET DESIGNATED"}
        </div>
        <div className="targeting-map__header-right">
          <div className="targeting-map__header-right-label">Designated</div>
          <div className="targeting-map__header-right-name">{target?.name ?? "—"}</div>
          {target && (
            <div className="targeting-map__header-right-sub">
              BRG {target.bearingDeg.toFixed(1)}° · {target.motion.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className="targeting-map__grid"
        onClick={handleGridClick}
        aria-label="Targeting grid"
      >
        <div className="targeting-map__reticle">
          <span className="targeting-map__bracket targeting-map__bracket--tl" />
          <span className="targeting-map__bracket targeting-map__bracket--tr" />
          <span className="targeting-map__bracket targeting-map__bracket--bl" />
          <span className="targeting-map__bracket targeting-map__bracket--br" />
          {target && <span className="targeting-map__marker" aria-hidden="true" />}
        </div>
      </button>

      <div className="targeting-map__telemetry">
        <span>Slew Rate 4.2 °/s</span>
        <span>Jitter 0.03 mrad</span>
        <span>Salvo {salvoMode}</span>
      </div>

      <div className="targeting-map__contacts">
        {targets.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            className={[
              "targeting-map__contact",
              candidate.id === selectedTargetId && "targeting-map__contact--selected",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => selectTarget(candidate.id)}
            aria-pressed={candidate.id === selectedTargetId}
          >
            <div className="targeting-map__contact-header">
              <span>{candidate.id}</span>
              <span>{candidate.allegiance}</span>
            </div>
            <div className="targeting-map__contact-name">{candidate.name}</div>
            <div className="targeting-map__contact-detail">
              {formatRange(candidate.rangeKm)} · BRG {candidate.bearingDeg.toFixed(1)}°
            </div>
          </button>
        ))}
      </div>

      <div className="targeting-map__solution">
        <div className="targeting-map__solution-cell">
          <span className="targeting-map__solution-label">Range</span>
          <span className="targeting-map__solution-value">
            {target ? formatRange(target.rangeKm) : "—"}
          </span>
        </div>
        <div className="targeting-map__solution-cell">
          <span className="targeting-map__solution-label">Time of Flight</span>
          <span className="targeting-map__solution-value">
            {target ? `${(target.rangeKm / 4000).toFixed(2)} s` : "—"}
          </span>
        </div>
        <div className="targeting-map__solution-cell">
          <span className="targeting-map__solution-label">Hit Probability</span>
          <span className="targeting-map__solution-value">
            {lockStatus === "locked" ? "94%" : "—"}
          </span>
        </div>
        <div className="targeting-map__solution-cell">
          <span className="targeting-map__solution-label">Solution</span>
          <span className="targeting-map__solution-value">
            {lockStatus === "locked" ? "Firing Solution" : "Tracking Only"}
          </span>
        </div>
      </div>
    </div>
  );
}
