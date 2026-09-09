import { describe, expect, it } from "vitest";
import { jitterValue } from "./jitter-value.util";

describe("jitterValue", () => {
  it("preserves decimal precision", () => {
    expect(jitterValue("3.11", () => 1)).toMatch(/^\d+\.\d{2}$/);
  });

  it("preserves an explicit + sign when the drifted value stays positive", () => {
    expect(jitterValue("+18", () => 1)).toMatch(/^\+\d+$/);
  });

  it("preserves an exponent suffix", () => {
    expect(jitterValue("1.284e6", () => 1)).toMatch(/^\d+\.\d{3}e6$/);
  });

  it("is a no-op at the midpoint of the rng range", () => {
    expect(jitterValue("412", () => 0.5)).toBe("412");
  });

  it("leaves non-numeric strings unchanged", () => {
    expect(jitterValue("nominal", () => 1)).toBe("nominal");
  });

  it("nudges the value up when rng returns above the midpoint", () => {
    const drifted = Number(jitterValue("100", () => 1));
    expect(drifted).toBeGreaterThan(100);
  });

  it("nudges the value down when rng returns below the midpoint", () => {
    const drifted = Number(jitterValue("100", () => 0));
    expect(drifted).toBeLessThan(100);
  });
});
