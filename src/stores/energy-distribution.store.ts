import { create } from "zustand";

/** Identifier for one of the six systems the reactor distributes power to. */
export type EnergySystemId = "drive" | "lifeSupport" | "sensors" | "shields" | "weapons" | "comms";

/** A single system's share of the reactor's total output. */
export interface EnergySystem {
  /** Identifier for this system. */
  id: EnergySystemId;
  /** Short uppercase label, e.g. "Life Support". */
  label: string;
  /** Share of the reactor's output allocated to this system, from 0 to 100. */
  percent: number;
}

/** Shape of the energy distribution state and the actions available to mutate it. */
export interface EnergyDistributionState {
  /** Maximum output of the main reactor, in gigawatt-hours. */
  reactorOutputGwh: number;
  /** All six systems and their current share of the reactor's output. */
  systems: EnergySystem[];
  /**
   * Sets `id`'s allocation to `percent` (clamped to 0-100), proportionally
   * rescaling the other five systems so the total never exceeds 100%.
   */
  setAllocation: (id: EnergySystemId, percent: number) => void;
}

const INITIAL_SYSTEMS: EnergySystem[] = [
  { id: "drive", label: "Drive", percent: 30 },
  { id: "lifeSupport", label: "Life Support", percent: 25 },
  { id: "sensors", label: "Sensors", percent: 20 },
  { id: "shields", label: "Shields", percent: 12 },
  { id: "weapons", label: "Weapons", percent: 8 },
  { id: "comms", label: "Comms", percent: 5 },
];

/**
 * Sets `id`'s share to `percent`, then rescales the remaining systems
 * proportionally to their prior shares (or evenly, if they were all zero) so
 * the six shares always sum to exactly 100. Any leftover point from integer
 * rounding is handed out one-by-one to the rescaled systems.
 */
function rebalance(systems: EnergySystem[], id: EnergySystemId, percent: number): EnergySystem[] {
  const target = Math.min(100, Math.max(0, Math.round(percent)));
  const others = systems.filter((system) => system.id !== id);
  const remaining = 100 - target;
  const othersTotal = others.reduce((sum, system) => sum + system.percent, 0);

  const scaled = others.map((system) => ({
    ...system,
    percent:
      othersTotal === 0
        ? Math.floor(remaining / others.length)
        : Math.floor((system.percent / othersTotal) * remaining),
  }));

  let leftover = remaining - scaled.reduce((sum, system) => sum + system.percent, 0);
  for (let i = 0; leftover > 0; i = (i + 1) % scaled.length) {
    scaled[i].percent += 1;
    leftover -= 1;
  }

  const scaledById = new Map(scaled.map((system) => [system.id, system]));
  return systems.map((system) =>
    system.id === id ? { ...system, percent: target } : (scaledById.get(system.id) ?? system),
  );
}

/**
 * Global store holding the mocked reactor output and how it's distributed
 * across the ship's six main power-consuming systems.
 */
export const useEnergyDistributionStore = create<EnergyDistributionState>((set) => ({
  reactorOutputGwh: 850,
  systems: INITIAL_SYSTEMS,
  setAllocation: (id, percent) =>
    set((state) => ({ systems: rebalance(state.systems, id, percent) })),
}));
