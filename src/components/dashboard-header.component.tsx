import type { JSX } from "react";
import { useClock } from "../hooks/use-clock.hook";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { ControlModeSwitch } from "./control-mode-switch.component";
import { StatDisplay } from "./stat-display.component";

import "./dashboard-header.component.css";

/** Props for {@link DashboardHeader}. */
export interface DashboardHeaderProps {
  /** Label for the control mode switch group. Defaults to "Control". */
  controlGroupLabel?: string;
  /** Label for the autopilot switch. Defaults to "Autopilot". */
  autopilotLabel?: string;
  /** Label for the manual switch. Defaults to "Manual". */
  manualLabel?: string;
}

/**
 * Primary dashboard header: vessel identity, live ship time plus
 * mission/frame telemetry, the autopilot/manual control switch, and flight
 * state — sourced from {@link useSpacecraftStore} and {@link useClock}.
 * Switch labels are configurable so different views can rename them
 * (e.g. "Auto" / "Manual").
 */
export function DashboardHeader({
  controlGroupLabel = "Control",
  autopilotLabel = "Autopilot",
  manualLabel = "Manual",
}: DashboardHeaderProps): JSX.Element {
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
        <ControlModeSwitch
          groupLabel={controlGroupLabel}
          options={[
            { mode: "autopilot", label: autopilotLabel },
            { mode: "manual", label: manualLabel },
          ]}
        />

        <StatDisplay
          className="stat-display--highlight inset-padding"
          label="Flight State"
          value={`${flightState} · ${velocityC.toFixed(3)} c`}
        />
      </div>
    </>
  );
}
