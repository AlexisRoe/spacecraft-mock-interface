import { create } from "zustand";

/**
 * Overall operational status of the spacecraft.
 */
export type SpacecraftStatus = "nominal" | "warning" | "critical";

/**
 * Active flight state.
 */
export type FlightState = "Station Keep" | "Cruise" | "Warp Prep" | "FTL";

/**
 * Flight action selectable in the manual navigation view's primary column.
 */
export type FlightAction = "NULL RATES" | "ALIGN TO WAYPOINT";

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
  /** Current flight state. */
  flightState: FlightState;
  /** Current velocity as a fraction (or multiple) of light speed. */
  velocityC: number;
  /** Current overall operational status. */
  status: SpacecraftStatus;
  /** Hull integrity percentage, from 0 to 100. */
  hullIntegrity: number;
  /** Current reactor power output, in megawatts. */
  reactorOutputMw: number;
  /** Shield integrity percentage, from 0 to 100. */
  shieldIntegrity: number;
  /** Selected flight action in the manual navigation view's primary column. */
  manualFlightAction: FlightAction;
  /** Commanded RCS thrust percentage set via the manual navigation thrust dialer. */
  manualThrustPercent: number;
  /** Index of the active RCS firing direction in the manual navigation thrust vector panel. */
  manualThrustDirectionIndex: number;
  /** Index of the active wedge field in the manual navigation steering wheel, if any. */
  manualSteeringActiveWedge: number | null;
  /** Sets the active flight state. */
  setFlightState: (flightState: FlightState) => void;
  /** Sets the current velocity as a fraction (or multiple) of light speed. */
  setVelocityC: (velocityC: number) => void;
  /** Updates the overall operational status. */
  setStatus: (status: SpacecraftStatus) => void;
  /** Sets hull integrity, clamped to the 0-100 range. */
  setHullIntegrity: (value: number) => void;
  /** Sets shield integrity, clamped to the 0-100 range. */
  setShieldIntegrity: (value: number) => void;
  /** Sets the selected manual navigation flight action. */
  setManualFlightAction: (action: FlightAction) => void;
  /** Sets the commanded manual navigation thrust percentage, clamped to 0-100. */
  setManualThrustPercent: (value: number) => void;
  /** Sets the active manual navigation thrust vector direction index. */
  setManualThrustDirectionIndex: (index: number) => void;
  /** Sets the active manual navigation steering wheel wedge index. */
  setManualSteeringActiveWedge: (index: number | null) => void;
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
  flightState: "Cruise",
  velocityC: 0.041,
  status: "nominal",
  hullIntegrity: 100,
  reactorOutputMw: 412,
  shieldIntegrity: 94,
  manualFlightAction: "NULL RATES",
  manualThrustPercent: 35,
  manualThrustDirectionIndex: 3,
  manualSteeringActiveWedge: null,
  setFlightState: (flightState) => set({ flightState }),
  setVelocityC: (velocityC) => set({ velocityC }),
  setStatus: (status) => set({ status }),
  setHullIntegrity: (value) => set({ hullIntegrity: Math.min(100, Math.max(0, value)) }),
  setShieldIntegrity: (value) => set({ shieldIntegrity: Math.min(100, Math.max(0, value)) }),
  setManualFlightAction: (action) => set({ manualFlightAction: action }),
  setManualThrustPercent: (value) =>
    set({ manualThrustPercent: Math.min(100, Math.max(0, value)) }),
  setManualThrustDirectionIndex: (index) => set({ manualThrustDirectionIndex: index }),
  setManualSteeringActiveWedge: (index) => set({ manualSteeringActiveWedge: index }),
}));
