/** Deployment status of a probe bay. */
export type ProbeBayStatus = "ready" | "deployed";

/** Data-sweep pattern a deployed probe can be commanded to use. */
export type ProbeSweepMode = "continuous" | "stepped" | "parked";

/** Fixed diagram coordinates (in the 0-1000 SVG viewBox) a probe travels to once deployed. */
export interface ProbeTarget {
  /** X position of the probe marker on the deployment diagram. */
  x: number;
  /** Y position of the probe marker on the deployment diagram. */
  y: number;
}

/** A single probe bay: its hardware and current deployment state. */
export interface ProbeBay {
  /** Stable identifier, e.g. `"bay-1"`. */
  id: string;
  /** Bay designation shown above the probe name, e.g. `"BAY 1"`. */
  bayLabel: string;
  /** Probe model/name, e.g. `"MK II Atmospheric"`. */
  name: string;
  /** Light grey sci-fi designation code shown under the probe name, e.g. `"SIG-CLASS IV · UNIT 0221-A"`. */
  designation: string;
  /** Short equipment line shown while the probe is racked, e.g. `"Descent shell · 40 min telemetry"`. */
  readySummary: string;
  /** Short telemetry line shown while the probe is away, e.g. `"Away 04:12:08 · 1 240 km"`. */
  deployedSummary: string;
  /** Current deployment status. */
  status: ProbeBayStatus;
  /** Current data-sweep mode; only meaningful while `status` is `"deployed"`. */
  sweepMode: ProbeSweepMode;
  /** Fixed diagram position this probe travels to once deployed. */
  target: ProbeTarget;
}

/** Initial mock roster of the ship's three probe bays. */
export const INITIAL_PROBE_BAYS: ProbeBay[] = [
  {
    id: "bay-1",
    bayLabel: "Bay 1",
    name: "MK II Atmospheric",
    designation: "SIG-CLASS IV · UNIT 0221-A",
    readySummary: "Descent shell · 40 min telemetry",
    deployedSummary: "Away 04:12:08 · 1 240 km",
    status: "deployed",
    sweepMode: "continuous",
    target: { x: 735, y: 415 },
  },
  {
    id: "bay-2",
    bayLabel: "Bay 2",
    name: "MK IV Field Mapper",
    designation: "SIG-CLASS II · UNIT 0118-C",
    readySummary: "Magnetometer · gradiometer",
    deployedSummary: "Away 00:48:52 · 360 km",
    status: "ready",
    sweepMode: "stepped",
    target: { x: 648, y: 817 },
  },
  {
    id: "bay-3",
    bayLabel: "Bay 3",
    name: "MK I Deep Sounder",
    designation: "SIG-CLASS III · UNIT 0304-B",
    readySummary: "Ground-penetrating radar array",
    deployedSummary: "Away 01:05:41 · 812 km",
    status: "ready",
    sweepMode: "parked",
    target: { x: 102, y: 730 },
  },
];

/** Per-mode illustrative science-bus/store impact used for the footer readout. */
const SWEEP_MODE_LOAD: Record<ProbeSweepMode, { busPercent: number; samplePeriodSeconds: number }> =
  {
    continuous: { busPercent: 42, samplePeriodSeconds: 0.6 },
    stepped: { busPercent: 18, samplePeriodSeconds: 2.4 },
    parked: { busPercent: 2, samplePeriodSeconds: 0 },
  };

/** Combined science-bus load and free storage readout for the active sweep mode(s). */
export interface ProbeTelemetryLoad {
  /** Percentage of the shared science data bus currently in use. */
  busPercent: number;
  /** Seconds between samples for the busiest active probe, or `0` if none are sampling. */
  samplePeriodSeconds: number;
  /** Percentage of onboard storage still free. */
  storeFreePercent: number;
}

/** Derives an illustrative telemetry load readout from the currently deployed bays. */
export function calculateTelemetryLoad(bays: ProbeBay[]): ProbeTelemetryLoad {
  const active = bays.filter((bay) => bay.status === "deployed");
  if (active.length === 0) {
    return { busPercent: 0, samplePeriodSeconds: 0, storeFreePercent: 100 };
  }

  const busPercent = active.reduce(
    (sum, bay) => sum + SWEEP_MODE_LOAD[bay.sweepMode].busPercent,
    0,
  );
  const samplePeriodSeconds = Math.min(
    ...active.map(
      (bay) => SWEEP_MODE_LOAD[bay.sweepMode].samplePeriodSeconds || Number.POSITIVE_INFINITY,
    ),
  );

  return {
    busPercent: Math.min(busPercent, 100),
    samplePeriodSeconds: Number.isFinite(samplePeriodSeconds) ? samplePeriodSeconds : 0,
    storeFreePercent: Math.max(4, 100 - busPercent),
  };
}
