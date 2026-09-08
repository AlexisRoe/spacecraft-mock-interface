import { describe, expect, it } from "vitest";
import { calculateTelemetryLoad, INITIAL_PROBE_BAYS } from "./probe-deployment.util";

describe("calculateTelemetryLoad", () => {
  it("reports zero load and full storage when nothing is deployed", () => {
    const bays = INITIAL_PROBE_BAYS.map((bay) => ({ ...bay, status: "ready" as const }));
    expect(calculateTelemetryLoad(bays)).toEqual({
      busPercent: 0,
      samplePeriodSeconds: 0,
      storeFreePercent: 100,
    });
  });

  it("sums bus load across deployed probes and reports the fastest sample period", () => {
    const load = calculateTelemetryLoad(INITIAL_PROBE_BAYS);
    expect(load.busPercent).toBeGreaterThan(0);
    expect(load.samplePeriodSeconds).toBeGreaterThanOrEqual(0);
    expect(load.storeFreePercent).toBeLessThan(100);
  });

  it("treats a parked-only deployment as zero sample period", () => {
    const bays = [
      { ...INITIAL_PROBE_BAYS[0], status: "deployed" as const, sweepMode: "parked" as const },
    ];
    expect(calculateTelemetryLoad(bays).samplePeriodSeconds).toBe(0);
  });
});
