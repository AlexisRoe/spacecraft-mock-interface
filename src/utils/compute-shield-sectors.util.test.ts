import { describe, expect, it } from "vitest";
import { computeShieldSectorLayers } from "./compute-shield-sectors.util";

describe("computeShieldSectorLayers", () => {
  it("returns three bands", () => {
    expect(computeShieldSectorLayers("fore", 100)).toHaveLength(3);
  });

  it("renders every band at zero width when strength is zero", () => {
    const layers = computeShieldSectorLayers("fore", 0);
    expect(layers.every((layer) => layer.strokeWidth === 0)).toBe(true);
  });

  it("lights up only the first band at low strength", () => {
    const layers = computeShieldSectorLayers("fore", 20);
    expect(layers[0].strokeWidth).toBeGreaterThan(0);
    expect(layers[1].strokeWidth).toBe(0);
    expect(layers[2].strokeWidth).toBe(0);
  });

  it("lights up all three bands at full strength", () => {
    const layers = computeShieldSectorLayers("fore", 100);
    expect(layers.every((layer) => layer.strokeWidth > 0)).toBe(true);
  });

  it("clamps strength outside 0-100", () => {
    const over = computeShieldSectorLayers("aft", 150);
    const under = computeShieldSectorLayers("aft", -50);
    expect(over.every((layer) => layer.strokeWidth > 0)).toBe(true);
    expect(under.every((layer) => layer.strokeWidth === 0)).toBe(true);
  });

  it("produces distinct paths per quadrant", () => {
    const fore = computeShieldSectorLayers("fore", 100)[0].d;
    const aft = computeShieldSectorLayers("aft", 100)[0].d;
    expect(fore).not.toBe(aft);
  });
});
