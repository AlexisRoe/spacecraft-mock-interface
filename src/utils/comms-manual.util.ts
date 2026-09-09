import { INITIAL_CHANNELS } from "./comms-channels.util";

/** Lowest tunable frequency on the manual band, in MHz. */
export const MIN_FREQUENCY_MHZ = 100;

/** Highest tunable frequency on the manual band, in MHz. */
export const MAX_FREQUENCY_MHZ = 500;

/** Step size applied by the tune up/down controls, in MHz. */
export const FREQUENCY_STEP_MHZ = 0.5;

/** Known frequencies (MHz) that trigger an incoming-hail alert when tuned in. */
const HAIL_FREQUENCIES_MHZ = [121.5, 406.0];

/** How close (MHz) the tuned frequency must be to a hail frequency to count as "on it". */
const HAIL_TOLERANCE_MHZ = 1.5;

/** Identifier for one of the manual panel's signal filters. */
export type CommsFilterId = "noise-reduction" | "static-filter" | "signal-boost";

/** A single toggleable signal filter and its display label. */
export interface CommsFilter {
  /** Stable identifier, e.g. `"noise-reduction"`. */
  id: CommsFilterId;
  /** Short uppercase label, e.g. "Noise Reduction". */
  label: string;
}

/** Every filter the comm officer can toggle on the manual panel. */
export const COMMS_FILTERS: CommsFilter[] = [
  { id: "noise-reduction", label: "Noise Reduction" },
  { id: "static-filter", label: "Static Filter" },
  { id: "signal-boost", label: "Signal Boost" },
];

/** A single set of mocked signal readings for the tuned frequency, each 0-100. */
export interface SignalReading {
  /** Received signal strength, in percent. */
  strengthPercent: number;
  /** Background noise level, in percent. */
  noisePercent: number;
  /** Carrier wave strength, in percent. */
  carrierPercent: number;
}

/** Clamps `value` to the 0-100 range and rounds it to the nearest integer. */
function clampPercent(value: number): number {
  return Math.round(Math.min(100, Math.max(0, value)));
}

/**
 * Derives mocked signal strength, noise, and carrier wave readings for
 * `frequencyMhz`, purely from the frequency itself so readings stay stable
 * between renders. Active filters shift the readings: noise reduction and
 * the static filter each cut noise, and signal boost lifts strength and
 * carrier wave strength.
 */
export function computeSignalReading(
  frequencyMhz: number,
  activeFilters: CommsFilterId[],
): SignalReading {
  let strength = 55 + 40 * Math.sin(frequencyMhz / 23);
  let noise = 50 + 35 * Math.cos(frequencyMhz / 17);
  let carrier = 60 + 35 * Math.sin(frequencyMhz / 31 + 1);

  if (activeFilters.includes("noise-reduction")) {
    noise -= 20;
  }
  if (activeFilters.includes("static-filter")) {
    noise -= 15;
  }
  if (activeFilters.includes("signal-boost")) {
    strength += 15;
    carrier += 10;
  }

  return {
    strengthPercent: clampPercent(strength),
    noisePercent: clampPercent(noise),
    carrierPercent: clampPercent(carrier),
  };
}

/** Whether `frequencyMhz` is close enough to a known hail frequency to count as tuned in. */
export function isHailFrequency(frequencyMhz: number): boolean {
  return HAIL_FREQUENCIES_MHZ.some(
    (hailMhz) => Math.abs(hailMhz - frequencyMhz) <= HAIL_TOLERANCE_MHZ,
  );
}

/** A single sampled point of the ambient spectrum curve. */
export interface SpectrumPoint {
  /** Frequency at this sample, in MHz. */
  frequencyMhz: number;
  /** Ambient signal amplitude at this frequency, 0-100. */
  amplitudePercent: number;
}

/**
 * Samples `count` evenly spaced points across the tunable band and derives a
 * mocked ambient spectrum amplitude for each, purely from frequency so the
 * curve stays stable between renders. Used to draw the spectrum diagram.
 */
export function buildSpectrumCurve(count: number): SpectrumPoint[] {
  const points: SpectrumPoint[] = [];
  const span = MAX_FREQUENCY_MHZ - MIN_FREQUENCY_MHZ;
  for (let i = 0; i < count; i += 1) {
    const frequencyMhz = MIN_FREQUENCY_MHZ + (span * i) / (count - 1);
    const amplitude =
      50 +
      28 * Math.sin(frequencyMhz / 19) +
      14 * Math.sin(frequencyMhz / 6.3 + 2.1) +
      8 * Math.sin(frequencyMhz / 2.4);
    points.push({ frequencyMhz, amplitudePercent: clampPercent(amplitude) });
  }
  return points;
}

/** Ascending MHz frequencies of every external channel, for the scanner to step through. */
const SCAN_FREQUENCIES_MHZ = INITIAL_CHANNELS.filter(
  (channel) => channel.kind === "external" && channel.frequency.endsWith("MHz"),
)
  .map((channel) => Number.parseFloat(channel.frequency))
  .sort((a, b) => a - b);

/**
 * Finds the next known external channel frequency above `frequencyMhz`,
 * wrapping back to the lowest one once the band's end is reached.
 */
export function getNextScanFrequency(frequencyMhz: number): number {
  const next = SCAN_FREQUENCIES_MHZ.find((candidate) => candidate > frequencyMhz);
  return next ?? SCAN_FREQUENCIES_MHZ[0];
}
