import { create } from "zustand";

/**
 * Overall operational status of the spacecraft.
 */
export type SpacecraftStatus = "nominal" | "warning" | "critical";

/**
 * Active flight control mode.
 */
export type ControlMode = "autopilot" | "manual";

/**
 * Shape of the spacecraft state and the actions available to mutate it.
 */
export interface SpacecraftState {
  /** Name of the vessel, as displayed to the captain. */
  shipName: string;
  /** Vessel class/type, e.g. "Survey Cutter". */
  shipClass: string;
  /** Vessel registry designation, e.g. "LH-4471". */
  registry: string;
  /** Active station/console designation, e.g. "Helm Station 01". */
  station: string;
  /** Reference frame used for navigation, e.g. "Ecliptic J2000". */
  referenceFrame: string;
  /** Active flight control mode. */
  controlMode: ControlMode;
  /** Current flight state, e.g. "Cruise". */
  flightState: string;
  /** Current velocity as a fraction of light speed. */
  velocityC: number;
  /** Current overall operational status. */
  status: SpacecraftStatus;
  /** Hull integrity percentage, from 0 to 100. */
  hullIntegrity: number;
  /** Sets the active flight control mode. */
  setControlMode: (mode: ControlMode) => void;
  /** Updates the overall operational status. */
  setStatus: (status: SpacecraftStatus) => void;
  /** Sets hull integrity, clamped to the 0-100 range. */
  setHullIntegrity: (value: number) => void;
}

/**
 * Global store holding the mocked spacecraft telemetry and captain actions.
 */
export const useSpacecraftStore = create<SpacecraftState>((set) => ({
  shipName: "SCV Meridian",
  shipClass: "Survey Cutter",
  registry: "LH-4471",
  station: "Helm Station 01",
  referenceFrame: "Ecliptic J2000",
  controlMode: "autopilot",
  flightState: "Cruise",
  velocityC: 0.041,
  status: "nominal",
  hullIntegrity: 100,
  setControlMode: (mode) => set({ controlMode: mode }),
  setStatus: (status) => set({ status }),
  setHullIntegrity: (value) => set({ hullIntegrity: Math.min(100, Math.max(0, value)) }),
}));
