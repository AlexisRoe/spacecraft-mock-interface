import type { JSX } from "react";
import { useSpacecraftStore } from "../stores/spacecraft.store";

import "./console-header.component.css";

/** Props for {@link ConsoleHeader}. */
export interface ConsoleHeaderProps {
  /** View title displayed on the left, e.g. "Space Navigation". */
  title: string;
  /** Status text shown on the right while in autopilot mode. */
  autopilotStatus: string;
  /** Status text shown on the right while in manual mode. */
  manualStatus: string;
}

/**
 * Header bar for a {@link ConsoleGrid} view: the view title on the left and a
 * control-mode-dependent status line on the right, sourced from
 * {@link useSpacecraftStore}.
 */
export function ConsoleHeader({
  title,
  autopilotStatus,
  manualStatus,
}: ConsoleHeaderProps): JSX.Element {
  const controlMode = useSpacecraftStore((state) => state.controlMode);
  const status = controlMode === "autopilot" ? autopilotStatus : manualStatus;

  return (
    <div className="console-header flex-row inset-padding">
      <span className="console-header__title">{title}</span>
      <span className="console-header__status">{status}</span>
    </div>
  );
}
