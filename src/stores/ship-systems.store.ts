import { create } from "zustand";

/** Identifier for a highlightable compartment/system on the {@link ShipDiagram}. */
export type ShipSystemId =
  | "sensors"
  | "bridge"
  | "crew"
  | "cargo"
  | "propulsion"
  | "lifeSupport"
  | "airlocks"
  | "reactor"
  | "shield"
  | "shuttle"
  | "weapons"
  | "hull";

/** A single ship system's display label and current operational reading. */
export interface ShipSystem {
  /** Identifier matching a highlightable region of the {@link ShipDiagram}. */
  id: ShipSystemId;
  /** Callout number shown on the ship status overview, e.g. "01". */
  callout: string;
  /** Short uppercase label, e.g. "Sensor & Comms Array". */
  label: string;
  /** Current reading, e.g. "98%" or "412 MW" or "SEALED". */
  value: string;
  /** Grey descriptor shown after the value, e.g. "SIGNAL" or "OUTPUT". */
  unit: string;
}

/** Shape of the ship systems state and the actions available to mutate it. */
export interface ShipSystemsState {
  /** All ship systems shown as buttons on the ship status overview. */
  systems: ShipSystem[];
  /** Currently selected system, highlighted on the ship diagram, if any. */
  selectedSystem: ShipSystemId | null;
  /** Selects `id`, or clears the selection if `id` is already selected. */
  toggleSystem: (id: ShipSystemId) => void;
  /** Sets a system's displayed value/reading. */
  setSystemValue: (id: ShipSystemId, value: string) => void;
}

const INITIAL_SYSTEMS: ShipSystem[] = [
  { id: "sensors", callout: "01", label: "Sensor & Comms Array", value: "98%", unit: "signal" },
  { id: "bridge", callout: "02", label: "Bridge / Command", value: "NOMINAL", unit: "status" },
  { id: "crew", callout: "03", label: "Crew Quarters", value: "6 / 8", unit: "occupied" },
  { id: "cargo", callout: "04", label: "Cargo Holds 1–3", value: "87%", unit: "capacity" },
  {
    id: "propulsion",
    callout: "05",
    label: "Main Engine & Nacelles",
    value: "96%",
    unit: "thrust",
  },
  { id: "lifeSupport", callout: "06", label: "Life Support & Water", value: "99%", unit: "o2 sat" },
  { id: "airlocks", callout: "07", label: "Airlock (Stbd)", value: "SEALED", unit: "status" },
  { id: "reactor", callout: "08", label: "Reactor & Power", value: "412 MW", unit: "output" },
  { id: "shield", callout: "09", label: "Shield Generator", value: "88%", unit: "integrity" },
  { id: "shuttle", callout: "10", label: "Shuttle, Docked", value: "DOCKED", unit: "status" },
  { id: "weapons", callout: "11", label: "Weapon Pods", value: "76%", unit: "charge" },
  { id: "hull", callout: "12", label: "Hull Integrity", value: "100%", unit: "integrity" },
];

/**
 * Global store holding the mocked per-system status readings shown on the
 * ship status overview, and which system (if any) is currently selected.
 */
export const useShipSystemsStore = create<ShipSystemsState>((set) => ({
  systems: INITIAL_SYSTEMS,
  selectedSystem: null,
  toggleSystem: (id) =>
    set((state) => ({ selectedSystem: state.selectedSystem === id ? null : id })),
  setSystemValue: (id, value) =>
    set((state) => ({
      systems: state.systems.map((system) => (system.id === id ? { ...system, value } : system)),
    })),
}));
