/** Derived performance figures for a given intermix ratio and field strength. */
export interface FtlPerformance {
  /** Intermix efficiency, from 0 to 1, peaking at a balanced 1:1 ratio. */
  efficiency: number;
  /** Reactor energy output, as a percentage of rated capacity. */
  energyOutputPercent: number;
  /** Current velocity as a multiple of light speed. */
  lightspeedFactor: number;
  /** Warp core plasma temperature, in kelvin. */
  coreTemperatureK: number;
  /** Magnetic containment field integrity, as a percentage. */
  containmentIntegrityPercent: number;
  /** Subspace distortion index, from 0 to 100; higher reads as rougher ride. */
  subspaceDistortionIndex: number;
}

const BALANCED_RATIO = 50;
const MAX_LIGHTSPEED_FACTOR = 12;
const BASE_CORE_TEMPERATURE_K = 15_000;
const MAX_CORE_TEMPERATURE_DELTA_K = 92_000;

/**
 * Computes the intermix efficiency, energy output, lightspeed factor, and
 * secondary core readouts for a given matter/antimatter intermix ratio and
 * field strength (both 0-100). Efficiency peaks when the ratio is balanced
 * at 50 and falls off the further it drifts either way; every other figure
 * scales with field strength and/or efficiency: temperature and distortion
 * climb with field strength, while containment integrity falls as
 * efficiency drops.
 */
export function computeFtlPerformance(
  intermixRatio: number,
  fieldStrength: number,
): FtlPerformance {
  const efficiency = Math.exp(-(((intermixRatio - BALANCED_RATIO) / 35) ** 2));
  const energyOutputPercent = fieldStrength * (0.5 + 0.5 * efficiency);
  const lightspeedFactor = (fieldStrength / 100) * MAX_LIGHTSPEED_FACTOR * efficiency;
  const coreTemperatureK =
    BASE_CORE_TEMPERATURE_K + (fieldStrength / 100) * MAX_CORE_TEMPERATURE_DELTA_K * efficiency;
  const containmentIntegrityPercent = 100 - (1 - efficiency) * 40;
  const subspaceDistortionIndex = fieldStrength * (1 - efficiency * 0.5);

  return {
    efficiency,
    energyOutputPercent,
    lightspeedFactor,
    coreTemperatureK,
    containmentIntegrityPercent,
    subspaceDistortionIndex,
  };
}
