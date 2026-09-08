import { describe, expect, it } from "vitest";
import { generateSensorFieldData } from "./sensor-field.util";

describe("generateSensorFieldData", () => {
  it("is deterministic for a given seed", () => {
    expect(generateSensorFieldData(7)).toEqual(generateSensorFieldData(7));
  });

  it("varies output for different seeds", () => {
    expect(generateSensorFieldData(7)).not.toEqual(generateSensorFieldData(8));
  });

  it("generates non-empty scatter clusters, a trace, and histograms", () => {
    const data = generateSensorFieldData(7);
    expect(data.clusterPoints.length).toBeGreaterThan(0);
    expect(data.streamPoints.length).toBeGreaterThan(0);
    expect(data.traceNodes).toHaveLength(10);
    expect(data.tracePath.startsWith("M ")).toBe(true);
    expect(data.topBars).toHaveLength(42);
    expect(data.sideBars).toHaveLength(28);
  });
});
