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
  | "weapons";

/** A single ship system's display label and current operational value. */
export interface ShipSystem {
  /** Identifier matching a highlightable region of the {@link ShipDiagram}. */
  id: ShipSystemId;
  /** Callout number shown on the ship status overview, e.g. "01". */
  callout: string;
  /** Short uppercase label, e.g. "Sensor & Comms Array". */
  label: string;
  /** Current operational value, as a percentage from 0 to 100. */
  value: number;
}

/** Shape of the ship systems state and the actions available to mutate it. */
export interface ShipSystemsState {
  /** All ship systems shown as buttons on the ship status overview. */
  systems: ShipSystem[];
  /** Currently selected system, highlighted on the ship diagram, if any. */
  selectedSystem: ShipSystemId | null;
  /** Selects `id`, or clears the selection if `id` is already selected. */
  toggleSystem: (id: ShipSystemId) => void;
  /** Sets a system's value, clamped to the 0-100 range. */
  setSystemValue: (id: ShipSystemId, value: number) => void;
}

const INITIAL_SYSTEMS: ShipSystem[] = [
  { id: "sensors", callout: "01", label: "Sensor & Comms Array", value: 98 },
  { id: "bridge", callout: "02", label: "Bridge / Command", value: 100 },
  { id: "crew", callout: "03", label: "Crew Quarters", value: 92 },
  { id: "cargo", callout: "04", label: "Cargo Holds 1–3", value: 87 },
  { id: "propulsion", callout: "05", label: "Main Engine & Nacelles", value: 96 },
  { id: "lifeSupport", callout: "06", label: "Life Support & Water", value: 99 },
  { id: "airlocks", callout: "07", label: "Airlock (Stbd)", value: 100 },
  { id: "reactor", callout: "08", label: "Reactor & Power", value: 94 },
  { id: "shield", callout: "09", label: "Shield Generator", value: 88 },
  { id: "shuttle", callout: "10", label: "Shuttle, Docked", value: 100 },
  { id: "weapons", callout: "11", label: "Weapon Pods", value: 76 },
];

/**
 * Global store holding the mocked per-system status values shown on the
 * ship status overview, and which system (if any) is currently selected.
 */
export const useShipSystemsStore = create<ShipSystemsState>((set) => ({
  systems: INITIAL_SYSTEMS,
  selectedSystem: null,
  toggleSystem: (id) =>
    set((state) => ({ selectedSystem: state.selectedSystem === id ? null : id })),
  setSystemValue: (id, value) =>
    set((state) => ({
      systems: state.systems.map((system) =>
        system.id === id ? { ...system, value: Math.min(100, Math.max(0, value)) } : system,
      ),
    })),
}));
