import type { JSX } from "react";
import { useClock } from "../../hooks/use-clock.hook";
import { useSpacecraftStore } from "../../stores/spacecraft.store";
import { StatDisplay } from "./stat-display.component";
import { ViewStateSwitch } from "./view-state-switch.component";

import "./dashboard-header.component.css";

/**
 * Primary dashboard header: vessel identity, live ship time plus
 * mission/frame telemetry, the active view's header toggle, and flight
 * state — sourced from {@link useSpacecraftStore} and {@link useClock}.
 */
export function DashboardHeader(): JSX.Element {
  const { time: shipTime, dayOfYear: missionDay } = useClock();

  const shipName = useSpacecraftStore((state) => state.shipName);
  const shipClass = useSpacecraftStore((state) => state.shipClass);
  const registry = useSpacecraftStore((state) => state.registry);
  const station = useSpacecraftStore((state) => state.station);
  const referenceFrame = useSpacecraftStore((state) => state.referenceFrame);
  const flightState = useSpacecraftStore((state) => state.flightState);
  const velocityC = useSpacecraftStore((state) => state.velocityC);

  return (
    <>
      <div className="dashboard-header__group">
        <div className="dashboard-header__identity inset-padding">
          <span className="dashboard-header__ship-name">{shipName}</span>
          <span className="dashboard-header__ship-subtitle">
            {shipClass} · REG {registry} · {station}
          </span>
        </div>

        <div className="dashboard-header__stats inset-padding">
          <StatDisplay label="Ship Time" value={shipTime} />
          <StatDisplay label="Mission Day" value={String(missionDay)} />
          <StatDisplay label="Frame" value={referenceFrame} />
        </div>
      </div>

      <div className="dashboard-header__group">
        <ViewStateSwitch groupLabel="View Mode" />

        <StatDisplay
          className="stat-display--highlight inset-padding"
          label={`Flight State (${velocityC.toFixed(2)}c)`}
          value={flightState}
        />
      </div>
    </>
  );
}
