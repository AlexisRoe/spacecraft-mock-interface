import { create } from "zustand";

/** Allegiance of a tracked contact, shown on the targeting map. */
export type TargetAllegiance = "friendly" | "hostile" | "neutral";

/** A trackable contact on the targeting map. */
export interface WeaponsTarget {
  /** Identifier for this contact, e.g. "CON 01". */
  id: string;
  /** Display name, e.g. "ISV Kestrel". */
  name: string;
  /** Ship class or descriptor, e.g. "Survey Cutter". */
  designation: string;
  /** Allegiance, driving the readout label. */
  allegiance: TargetAllegiance;
  /** Range to the contact, in kilometers. */
  rangeKm: number;
  /** Bearing to the contact, in degrees. */
  bearingDeg: number;
  /** Whether the contact is receding or closing. */
  motion: "receding" | "closing";
  /** Contact's shield strength, 0-100. */
  shieldPercent: number;
  /** Contact's hull integrity, 0-100. */
  hullPercent: number;
  /** Normalized position on the starmap, 0-1 in each axis. */
  position: { x: number; y: number };
}

/** Current state of the fire-control lock. */
export type LockStatus = "none" | "acquiring" | "locked";

/** Number of rounds fired per trigger pull. */
export type SalvoMode = "single" | "pair" | "full";

/** Master arming state of the weapons systems. */
export type WeaponStatus = "safe" | "standby" | "battle";

/** Charge/reload state of a plasma cannon or the torpedo tubes. */
export type WeaponReadiness = "charging" | "ready" | "reloading";

/** One of the ship's two plasma cannon mounts. */
export interface PlasmaCannon {
  /** Identifier for this mount, e.g. "a". */
  id: string;
  /** Display label, e.g. "Plasma Cannon A". */
  label: string;
  /** Mount description, e.g. "Dorsal Pair · 2 Mounts". */
  mount: string;
  /** Current charge, 0-100. Fires only once fully charged. */
  chargePercent: number;
  /** Seconds for a full charge cycle from empty. */
  cycleSeconds: number;
  /** Current readiness, derived from `chargePercent`. */
  status: WeaponReadiness;
}

/** Shape of the weapons state and the actions available to mutate it. */
export interface WeaponsState {
  /** The three preset trackable contacts. */
  targets: WeaponsTarget[];
  /** Id of the currently selected target, or null if none is selected. */
  selectedTargetId: string | null;
  /** Current fire-control lock status against the selected target. */
  lockStatus: LockStatus;
  /** Seconds remaining while `lockStatus` is "acquiring". */
  lockSecondsRemaining: number;
  /** Number of rounds released per trigger pull. */
  salvoMode: SalvoMode;
  /** Master arming state. */
  weaponStatus: WeaponStatus;
  /** The two plasma cannon mounts. */
  plasmaCannons: PlasmaCannon[];
  /** Total torpedo rounds remaining in the magazine. */
  torpedoRoundsRemaining: number;
  /** Total torpedo rounds the magazine holds. */
  torpedoRoundsTotal: number;
  /** Number of tubes currently loaded. */
  torpedoTubesLoaded: number;
  /** Total number of torpedo tubes. */
  torpedoTubesTotal: number;
  /** Seconds remaining before the next tube finishes reloading, or 0 if none is reloading. */
  torpedoReloadSecondsRemaining: number;
  /** Whether a plasma cannon just fired, for a momentary flash on its fire button. */
  plasmaFiring: boolean;
  /** Whether a torpedo just launched, for a momentary flash on its fire button. */
  torpedoFiring: boolean;
  /** Selects a preset target by id, resetting any lock. */
  selectTarget: (id: string) => void;
  /**
   * Starts a `LOCK_DURATION_SECONDS` lock-acquisition cycle against the
   * selected target. No-op with no target selected or a cycle already running.
   */
  acquireLock: () => void;
  /** Advances an in-progress lock acquisition by one second, locking on at zero. */
  tickLock: () => void;
  /** Sets the salvo mode. */
  setSalvoMode: (mode: SalvoMode) => void;
  /** Sets the master weapon status. */
  setWeaponStatus: (status: WeaponStatus) => void;
  /** Advances all charging cannons and any active torpedo reload by one second. */
  tickCharging: () => void;
  /**
   * Fires `cannonId` if locked, ready, and energy is allocated to weapons —
   * draining it to 0% charge and briefly flashing its fire button white.
   */
  firePlasmaCannon: (cannonId: string) => void;
  /**
   * Launches a torpedo if locked, a tube is loaded, and energy is allocated
   * to weapons — consuming a round and starting that tube's reload, and
   * briefly flashing the fire button white.
   */
  fireTorpedo: () => void;
}

/** Seconds a lock-acquisition cycle takes. */
export const LOCK_DURATION_SECONDS = 2;
const TORPEDO_RELOAD_SECONDS = 38;
/** Milliseconds a fire button flashes white after firing; the UI layer clears the flash after this. */
export const FIRE_FLASH_MS = 220;

const INITIAL_TARGETS: WeaponsTarget[] = [
  {
    id: "CON 01",
    name: "ISV Kestrel",
    designation: "Survey Cutter",
    allegiance: "friendly",
    rangeKm: 1240,
    bearingDeg: 42.1,
    motion: "receding",
    shieldPercent: 88,
    hullPercent: 100,
    position: { x: 0.5, y: 0.45 },
  },
  {
    id: "CON 02",
    name: "Unknown 4B",
    designation: "Unidentified Contact",
    allegiance: "hostile",
    rangeKm: 88,
    bearingDeg: 311.4,
    motion: "closing",
    shieldPercent: 46,
    hullPercent: 79,
    position: { x: 0.22, y: 0.6 },
  },
  {
    id: "CON 03",
    name: "Relay Hulk",
    designation: "Derelict Relay Platform",
    allegiance: "neutral",
    rangeKm: 640,
    bearingDeg: 188.0,
    motion: "receding",
    shieldPercent: 0,
    hullPercent: 34,
    position: { x: 0.78, y: 0.3 },
  },
];

const INITIAL_PLASMA_CANNONS: PlasmaCannon[] = [
  {
    id: "a",
    label: "Plasma Cannon A",
    mount: "Dorsal Pair · 2 Mounts",
    chargePercent: 96,
    cycleSeconds: 4.2,
    status: "ready",
  },
  {
    id: "b",
    label: "Plasma Cannon B",
    mount: "Ventral Pair · 2 Mounts",
    chargePercent: 71,
    cycleSeconds: 4.2,
    status: "charging",
  },
];

/** Derives readiness from a cannon's charge level. */
function readinessFor(chargePercent: number): WeaponReadiness {
  return chargePercent >= 100 ? "ready" : "charging";
}

/**
 * Global store holding the mocked weapons systems: the targeting map's three
 * preset contacts and current selection/lock, the master arming and salvo
 * settings, and the two plasma cannons and torpedo tubes with their
 * charge/reload state. Shown on the Ops console's Weapons view. Firing
 * requires an acquired lock, a ready weapon, and energy allocated to weapons
 * (see `useEnergyDistributionStore`) — gating is left to the UI layer, which
 * has access to both stores.
 */
export const useWeaponsStore = create<WeaponsState>((set) => ({
  targets: INITIAL_TARGETS,
  selectedTargetId: INITIAL_TARGETS[0].id,
  lockStatus: "none",
  lockSecondsRemaining: 0,
  salvoMode: "single",
  weaponStatus: "standby",
  plasmaCannons: INITIAL_PLASMA_CANNONS,
  torpedoRoundsRemaining: 14,
  torpedoRoundsTotal: 20,
  torpedoTubesLoaded: 2,
  torpedoTubesTotal: 4,
  torpedoReloadSecondsRemaining: 0,
  plasmaFiring: false,
  torpedoFiring: false,

  selectTarget: (id) => set({ selectedTargetId: id, lockStatus: "none", lockSecondsRemaining: 0 }),

  acquireLock: () =>
    set((state) => {
      if (!state.selectedTargetId || state.lockStatus !== "none") return state;
      return { lockStatus: "acquiring", lockSecondsRemaining: LOCK_DURATION_SECONDS };
    }),

  tickLock: () =>
    set((state) => {
      if (state.lockStatus !== "acquiring") return state;
      const remaining = state.lockSecondsRemaining - 1;
      if (remaining > 0) return { lockSecondsRemaining: remaining };
      return { lockStatus: "locked", lockSecondsRemaining: 0 };
    }),

  setSalvoMode: (mode) => set({ salvoMode: mode }),

  setWeaponStatus: (status) => set({ weaponStatus: status }),

  tickCharging: () =>
    set((state) => ({
      plasmaCannons: state.plasmaCannons.map((cannon) => {
        if (cannon.chargePercent >= 100) return cannon;
        const chargePercent = Math.min(
          100,
          cannon.chargePercent + Math.round(100 / cannon.cycleSeconds),
        );
        return { ...cannon, chargePercent, status: readinessFor(chargePercent) };
      }),
      torpedoReloadSecondsRemaining:
        state.torpedoReloadSecondsRemaining > 0 ? state.torpedoReloadSecondsRemaining - 1 : 0,
      torpedoTubesLoaded:
        state.torpedoReloadSecondsRemaining === 1 &&
        state.torpedoTubesLoaded < state.torpedoTubesTotal &&
        state.torpedoRoundsRemaining > state.torpedoTubesLoaded
          ? state.torpedoTubesLoaded + 1
          : state.torpedoTubesLoaded,
    })),

  firePlasmaCannon: (cannonId) =>
    set((state) => {
      const cannon = state.plasmaCannons.find((candidate) => candidate.id === cannonId);
      if (state.lockStatus !== "locked" || cannon?.status !== "ready") return state;
      return {
        plasmaFiring: true,
        plasmaCannons: state.plasmaCannons.map((candidate) =>
          candidate.id === cannonId
            ? { ...candidate, chargePercent: 0, status: "charging" }
            : candidate,
        ),
      };
    }),

  fireTorpedo: () =>
    set((state) => {
      if (state.lockStatus !== "locked" || state.torpedoTubesLoaded <= 0) return state;
      return {
        torpedoFiring: true,
        torpedoRoundsRemaining: state.torpedoRoundsRemaining - 1,
        torpedoTubesLoaded: state.torpedoTubesLoaded - 1,
        torpedoReloadSecondsRemaining:
          state.torpedoReloadSecondsRemaining > 0
            ? state.torpedoReloadSecondsRemaining
            : TORPEDO_RELOAD_SECONDS,
      };
    }),
}));

/** Resets a fire flash flag back to false; call after `FIRE_FLASH_MS` from the UI layer. */
export function clearFireFlash(which: "plasma" | "torpedo"): void {
  useWeaponsStore.setState(which === "plasma" ? { plasmaFiring: false } : { torpedoFiring: false });
}
