import { create } from "zustand";
import type { EnergySystemId } from "./energy-distribution.store";

/** Identifier for one of the four fusion torches in the engine cluster. */
export type TorchId = "p1" | "p2" | "s1" | "s2";

/** Operational status of a fusion torch. */
export type TorchStatus = "online" | "derated" | "locked";

/** A single fusion torch's current readings. */
export interface Torch {
  /** Identifier matching the torch's position in the cluster. */
  id: TorchId;
  /** Short uppercase label, e.g. "Torch P1". */
  label: string;
  /** Current thrust output, from 0 to 100. */
  percent: number;
  /** Nozzle exit temperature, in kelvin. */
  nozzleK: number;
  /** Specific impulse, in seconds. */
  ispS: number;
  /** Fuel pump speed, in rpm. */
  pumpRpm: number;
  /** Gimbal deflection, e.g. "+0.4°", or "LOCKED" when gimbal is disabled. */
  gimbal: string;
  /** Current operational status. */
  status: TorchStatus;
  /** Hours of operation since this torch's last service. */
  hoursSinceService: number;
}

/** Identifier for one of the reactor bus load presets. */
export type LoadProfile = "balanced" | "drive" | "shields" | "survey";

/** Shape of the propulsion state and the actions available to mutate it. */
export interface PropulsionState {
  /** All four fusion torches in the engine cluster. */
  torches: Torch[];
  /** Currently selected torch, shown in the cluster footer. */
  selectedTorchId: TorchId;
  /** Remaining deuterium slush fuel, from 0 to 100. */
  fuelPercent: number;
  /** Estimated remaining delta-v, in km/s. */
  deltaVKmS: number;
  /** Whether the selected torch is currently in an active burn. */
  burnActive: boolean;
  /** Elapsed seconds of the current burn. */
  burnSeconds: number;
  /** Currently applied reactor bus load preset. */
  loadProfile: LoadProfile;
  /** Selects `id` as the active torch shown in the cluster footer. */
  selectTorch: (id: TorchId) => void;
  /** Toggles the active burn, resetting the burn timer when stopped. */
  toggleBurn: () => void;
  /** Advances the active burn by one second, consuming a little fuel. */
  tickBurn: () => void;
  /** Records the reactor bus load preset now applied. */
  setLoadProfile: (profile: LoadProfile) => void;
}

/** Reactor bus allocation, by system, for each selectable load preset. */
export const LOAD_PROFILE_PRESETS: Record<LoadProfile, Record<EnergySystemId, number>> = {
  balanced: { drive: 30, lifeSupport: 25, sensors: 20, shields: 12, weapons: 8, comms: 5 },
  drive: { drive: 55, lifeSupport: 20, sensors: 10, shields: 8, weapons: 4, comms: 3 },
  shields: { drive: 15, lifeSupport: 20, sensors: 10, shields: 45, weapons: 5, comms: 5 },
  survey: { drive: 15, lifeSupport: 20, sensors: 45, shields: 8, weapons: 4, comms: 8 },
};

const INITIAL_TORCHES: Torch[] = [
  {
    id: "p1",
    label: "Torch P1",
    percent: 62,
    nozzleK: 2810,
    ispS: 9400,
    pumpRpm: 18_200,
    gimbal: "+0.4°",
    status: "online",
    hoursSinceService: 612,
  },
  {
    id: "p2",
    label: "Torch P2",
    percent: 61,
    nozzleK: 2794,
    ispS: 9380,
    pumpRpm: 18_040,
    gimbal: "-0.1°",
    status: "online",
    hoursSinceService: 740,
  },
  {
    id: "s1",
    label: "Torch S1",
    percent: 65,
    nozzleK: 2822,
    ispS: 9410,
    pumpRpm: 18_310,
    gimbal: "0.0°",
    status: "online",
    hoursSinceService: 888,
  },
  {
    id: "s2",
    label: "Torch S2",
    percent: 47,
    nozzleK: 2640,
    ispS: 9120,
    pumpRpm: 16_900,
    gimbal: "LOCKED",
    status: "derated",
    hoursSinceService: 1_204,
  },
];

/**
 * Global store holding the mocked fusion torch cluster, deuterium fuel
 * level, and reactor bus load preset shown on the Propulsion console's
 * conventional drive view.
 */
export const usePropulsionStore = create<PropulsionState>((set) => ({
  torches: INITIAL_TORCHES,
  selectedTorchId: "s1",
  fuelPercent: 62.4,
  deltaVKmS: 214,
  burnActive: false,
  burnSeconds: 0,
  loadProfile: "balanced",
  selectTorch: (id) => set({ selectedTorchId: id }),
  toggleBurn: () => set((state) => ({ burnActive: !state.burnActive, burnSeconds: 0 })),
  tickBurn: () =>
    set((state) => ({
      burnSeconds: state.burnSeconds + 1,
      fuelPercent: Math.max(0, state.fuelPercent - 0.05),
    })),
  setLoadProfile: (profile) => set({ loadProfile: profile }),
}));
