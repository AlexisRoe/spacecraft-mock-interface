import { describe, expect, it } from "vitest";
import {
  computeSignalReading,
  getNextScanFrequency,
  isHailFrequency,
  MAX_FREQUENCY_MHZ,
  MIN_FREQUENCY_MHZ,
} from "./comms-manual.util";

describe("computeSignalReading", () => {
  it("returns readings within 0-100", () => {
    for (let mhz = MIN_FREQUENCY_MHZ; mhz <= MAX_FREQUENCY_MHZ; mhz += 37) {
      const reading = computeSignalReading(mhz, []);
      expect(reading.strengthPercent).toBeGreaterThanOrEqual(0);
      expect(reading.strengthPercent).toBeLessThanOrEqual(100);
      expect(reading.noisePercent).toBeGreaterThanOrEqual(0);
      expect(reading.noisePercent).toBeLessThanOrEqual(100);
      expect(reading.carrierPercent).toBeGreaterThanOrEqual(0);
      expect(reading.carrierPercent).toBeLessThanOrEqual(100);
    }
  });

  it("is deterministic for a given frequency and filter set", () => {
    expect(computeSignalReading(150, ["signal-boost"])).toEqual(
      computeSignalReading(150, ["signal-boost"]),
    );
  });

  it("lowers noise when noise-reduction or static-filter is active", () => {
    const base = computeSignalReading(150, []);
    const filtered = computeSignalReading(150, ["noise-reduction", "static-filter"]);
    expect(filtered.noisePercent).toBeLessThanOrEqual(base.noisePercent);
  });

  it("raises strength and carrier when signal-boost is active", () => {
    const base = computeSignalReading(150, []);
    const boosted = computeSignalReading(150, ["signal-boost"]);
    expect(boosted.strengthPercent).toBeGreaterThanOrEqual(base.strengthPercent);
    expect(boosted.carrierPercent).toBeGreaterThanOrEqual(base.carrierPercent);
  });
});

describe("isHailFrequency", () => {
  it("is true near a known hail frequency", () => {
    expect(isHailFrequency(121.5)).toBe(true);
    expect(isHailFrequency(406.2)).toBe(true);
  });

  it("is false away from every known hail frequency", () => {
    expect(isHailFrequency(300)).toBe(false);
  });
});

describe("getNextScanFrequency", () => {
  it("steps to the next external channel frequency, wrapping at the top of the band", () => {
    const next = getNextScanFrequency(MIN_FREQUENCY_MHZ);
    expect(next).toBeGreaterThan(MIN_FREQUENCY_MHZ);

    const wrapped = getNextScanFrequency(MAX_FREQUENCY_MHZ);
    expect(wrapped).toBeLessThan(MAX_FREQUENCY_MHZ);
  });
});
