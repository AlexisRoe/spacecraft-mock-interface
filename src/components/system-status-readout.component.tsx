import type { JSX } from "react";
import { useSpacecraftStore } from "../stores/spacecraft.store";

import "./system-status-readout.component.css";

const STATUS_LABEL: Record<"nominal" | "warning" | "critical", string> = {
  nominal: "All Systems Nominal",
  warning: "System Warning",
  critical: "System Critical",
};

/**
 * Compact, dot-separated readout of overall status, reactor output, and
 * shield integrity, sourced from {@link useSpacecraftStore}.
 */
export function SystemStatusReadout(): JSX.Element {
  const status = useSpacecraftStore((state) => state.status);
  const reactorOutputMw = useSpacecraftStore((state) => state.reactorOutputMw);
  const shieldIntegrity = useSpacecraftStore((state) => state.shieldIntegrity);

  return (
    <div className="system-status-readout">
      <span>{STATUS_LABEL[status]}</span>
      <span className="system-status-readout__separator">·</span>
      <span>Reactor {reactorOutputMw} MW</span>
      <span className="system-status-readout__separator">·</span>
      <span>Shield {shieldIntegrity}%</span>
    </div>
  );
}
