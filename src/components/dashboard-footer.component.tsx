import type { JSX } from "react";
import { FlightStateSwitch } from "./flight-state-switch.component";
import { SystemStatusReadout } from "./system-status-readout.component";

/** Props for {@link DashboardFooter}. */
export interface DashboardFooterProps {
  /** Label for the flight state switch group. Defaults to "Flight State". */
  groupLabel?: string;
}

/**
 * Primary dashboard footer: the flight state switch (letting the captain
 * select between "Station Keep", "Cruise", and "Warp Prep") on the left, and
 * a compact system status readout on the right.
 */
export function DashboardFooter({
  groupLabel = "Helm",
}: DashboardFooterProps): JSX.Element {
  return (
    <>
      <FlightStateSwitch
        groupLabel={groupLabel}
        options={[
          { state: "Station Keep", label: "Station Keep" },
          { state: "Cruise", label: "Cruise" },
          { state: "Warp Prep", label: "Warp Prep" },
        ]}
      />

      <SystemStatusReadout />
    </>
  );
}
