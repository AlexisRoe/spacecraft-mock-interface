import { create } from "zustand";

/**
 * Overall operational status of the spacecraft.
 */
export type SpacecraftStatus = "nominal" | "warning" | "critical";

/**
 * Shape of the spacecraft state and the actions available to mutate it.
 */
export interface SpacecraftState {
  /** Name of the vessel, as displayed to the captain. */
  shipName: string;
  /** Current overall operational status. */
  status: SpacecraftStatus;
  /** Hull integrity percentage, from 0 to 100. */
  hullIntegrity: number;
  /** Updates the overall operational status. */
  setStatus: (status: SpacecraftStatus) => void;
  /** Sets hull integrity, clamped to the 0-100 range. */
  setHullIntegrity: (value: number) => void;
}

/**
 * Global store holding the mocked spacecraft telemetry and captain actions.
 */
export const useSpacecraftStore = create<SpacecraftState>((set) => ({
  shipName: "USS Placeholder",
  status: "nominal",
  hullIntegrity: 100,
  setStatus: (status) => set({ status }),
  setHullIntegrity: (value) => set({ hullIntegrity: Math.min(100, Math.max(0, value)) }),
}));
