import { describe, expect, it } from "vitest";
import { computeFtlPerformance } from "./compute-ftl-performance.util";

describe("computeFtlPerformance", () => {
  it("peaks efficiency at a balanced 1:1 intermix ratio", () => {
    const balanced = computeFtlPerformance(50, 100);
    const skewed = computeFtlPerformance(10, 100);
    expect(balanced.efficiency).toBeCloseTo(1, 5);
    expect(skewed.efficiency).toBeLessThan(balanced.efficiency);
  });

  it("scales energy output and lightspeed factor with field strength", () => {
    const low = computeFtlPerformance(50, 20);
    const high = computeFtlPerformance(50, 90);
    expect(high.energyOutputPercent).toBeGreaterThan(low.energyOutputPercent);
    expect(high.lightspeedFactor).toBeGreaterThan(low.lightspeedFactor);
  });

  it("produces zero output and lightspeed factor at zero field strength", () => {
    const result = computeFtlPerformance(50, 0);
    expect(result.energyOutputPercent).toBe(0);
    expect(result.lightspeedFactor).toBe(0);
  });

  it("raises core temperature and distortion, and lowers containment integrity, off-balance", () => {
    const balanced = computeFtlPerformance(50, 80);
    const skewed = computeFtlPerformance(15, 80);
    expect(skewed.coreTemperatureK).toBeLessThan(balanced.coreTemperatureK);
    expect(skewed.containmentIntegrityPercent).toBeLessThan(balanced.containmentIntegrityPercent);
    expect(skewed.subspaceDistortionIndex).toBeGreaterThan(balanced.subspaceDistortionIndex);
  });
});
