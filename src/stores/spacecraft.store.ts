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
 * Active flight state.
 */
export type FlightState = "Station Keep" | "Cruise" | "Warp Prep";

/**
 * Flight action selectable in the manual navigation view's primary column.
 */
export type FlightAction = "NULL RATES" | "ALIGN TO WAYPOINT";

/**
 * The nine console views reachable from the nav bar.
 */
export const NavView = {
  Navigation: "navigation",
  Propulsion: "propulsion",
  FieldsFtl: "fields-ftl",
  Communications: "communications",
  Defence: "defence",
  FireControl: "fire-control",
  ShipStatus: "ship-status",
  Science: "science",
  Logs: "logs",
} as const;

/**
 * Identifier for one of the ten console views reachable from the nav bar.
 */
export type NavView = (typeof NavView)[keyof typeof NavView];

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
  /** Current flight state. */
  flightState: FlightState;
  /** Current velocity as a fraction of light speed. */
  velocityC: number;
  /** Current overall operational status. */
  status: SpacecraftStatus;
  /** Hull integrity percentage, from 0 to 100. */
  hullIntegrity: number;
  /** Current reactor power output, in megawatts. */
  reactorOutputMw: number;
  /** Shield integrity percentage, from 0 to 100. */
  shieldIntegrity: number;
  /** Currently selected console view. */
  activeView: NavView;
  /** Selected flight action in the manual navigation view's primary column. */
  manualFlightAction: FlightAction;
  /** Commanded RCS thrust percentage set via the manual navigation thrust dialer. */
  manualThrustPercent: number;
  /** Index of the active RCS firing direction in the manual navigation thrust vector panel. */
  manualThrustDirectionIndex: number;
  /** Index of the active wedge field in the manual navigation steering wheel, if any. */
  manualSteeringActiveWedge: number | null;
  /** Sets the active console view. */
  setActiveView: (view: NavView) => void;
  /** Sets the active flight control mode. */
  setControlMode: (mode: ControlMode) => void;
  /** Sets the active flight state. */
  setFlightState: (flightState: FlightState) => void;
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
  controlMode: "autopilot",
  flightState: "Cruise",
  velocityC: 0.041,
  status: "nominal",
  hullIntegrity: 100,
  reactorOutputMw: 412,
  shieldIntegrity: 94,
  activeView: NavView.Navigation,
  manualFlightAction: "NULL RATES",
  manualThrustPercent: 35,
  manualThrustDirectionIndex: 3,
  manualSteeringActiveWedge: null,
  setActiveView: (view) => set({ activeView: view }),
  setControlMode: (mode) => set({ controlMode: mode }),
  setFlightState: (flightState) => set({ flightState }),
  setStatus: (status) => set({ status }),
  setHullIntegrity: (value) => set({ hullIntegrity: Math.min(100, Math.max(0, value)) }),
  setShieldIntegrity: (value) => set({ shieldIntegrity: Math.min(100, Math.max(0, value)) }),
  setManualFlightAction: (action) => set({ manualFlightAction: action }),
  setManualThrustPercent: (value) =>
    set({ manualThrustPercent: Math.min(100, Math.max(0, value)) }),
  setManualThrustDirectionIndex: (index) => set({ manualThrustDirectionIndex: index }),
  setManualSteeringActiveWedge: (index) => set({ manualSteeringActiveWedge: index }),
}));
