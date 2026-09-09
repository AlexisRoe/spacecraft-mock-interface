import { create } from "zustand";

/** Identifier for one of the four shield emitter quadrants. */
export type ShieldQuadrantId = "fore" | "aft" | "dorsal" | "ventral";

/** A single shield quadrant's allocation, charge, and emitter state. */
export interface ShieldQuadrant {
  /** Identifier for this quadrant. */
  id: ShieldQuadrantId;
  /** Short uppercase label, e.g. "Dorsal". */
  label: string;
  /** Share of the shield grid's energy allocated to this quadrant, 0-100. Always 0 while inactive. */
  percent: number;
  /** Current shield strength for this quadrant, 0-100. Restored to 100 by {@link ShieldsState.regenerateShields}. */
  chargePercent: number;
  /** Whether this quadrant's emitter is active. Inactive emitters hold no charge or allocation. */
  active: boolean;
}

/** Shape of the shield grid state and the actions available to mutate it. */
export interface ShieldsState {
  /** All four shield quadrants. */
  quadrants: ShieldQuadrant[];
  /** Whether the shield grid is currently raised. */
  raised: boolean;
  /** Whether a regeneration cycle is currently running. */
  regenerating: boolean;
  /** Seconds remaining in the current regeneration cycle. */
  regenSecondsRemaining: number;
  /**
   * Sets `id`'s energy allocation to `percent` (clamped to 0-100),
   * proportionally rescaling the other active quadrants so the active
   * quadrants' shares always sum to 100. No-op while `id` is inactive.
   */
  setAllocation: (id: ShieldQuadrantId, percent: number) => void;
  /**
   * Activates or deactivates `id`'s emitter. Either way, the grid's energy
   * is re-split evenly across whichever quadrants are active afterward.
   */
  toggleActive: (id: ShieldQuadrantId) => void;
  /** Raises the shield grid. */
  raiseShields: () => void;
  /** Lowers the shield grid. */
  lowerShields: () => void;
  /** Starts a 3-second regeneration cycle, if one isn't already running. */
  regenerateShields: () => void;
  /** Advances the active regeneration cycle by one second, ending it at zero. */
  tickRegeneration: () => void;
}

const QUADRANT_IDS: ShieldQuadrantId[] = ["fore", "aft", "dorsal", "ventral"];

const REGEN_DURATION_SECONDS = 3;

const INITIAL_QUADRANTS: ShieldQuadrant[] = [
  { id: "fore", label: "Fore", percent: 25, chargePercent: 100, active: true },
  { id: "aft", label: "Aft", percent: 25, chargePercent: 100, active: true },
  { id: "dorsal", label: "Dorsal", percent: 25, chargePercent: 100, active: true },
  { id: "ventral", label: "Ventral", percent: 25, chargePercent: 100, active: true },
];

/** Splits 100 as evenly as possible across `activeIds`, handing any rounding remainder to the first ones. */
function evenSplit(activeIds: ShieldQuadrantId[]): Record<ShieldQuadrantId, number> {
  const result = Object.fromEntries(QUADRANT_IDS.map((id) => [id, 0])) as Record<
    ShieldQuadrantId,
    number
  >;
  if (activeIds.length === 0) return result;

  const share = Math.floor(100 / activeIds.length);
  const leftover = 100 - share * activeIds.length;
  activeIds.forEach((id, index) => {
    result[id] = share + (index < leftover ? 1 : 0);
  });
  return result;
}

/**
 * Sets `id`'s share to `percent`, then rescales the other active quadrants
 * proportionally to their prior shares (or evenly, if they were all zero) so
 * the active quadrants' shares always sum to 100. If `id` is the only active
 * quadrant, it always holds the full 100. Any leftover point from integer
 * rounding is handed out one-by-one to the rescaled quadrants.
 */
function rebalance(
  quadrants: ShieldQuadrant[],
  id: ShieldQuadrantId,
  percent: number,
): ShieldQuadrant[] {
  const others = quadrants.filter((quadrant) => quadrant.id !== id && quadrant.active);
  const target = others.length === 0 ? 100 : Math.min(100, Math.max(0, Math.round(percent)));
  const remaining = 100 - target;
  const othersTotal = others.reduce((sum, quadrant) => sum + quadrant.percent, 0);

  const scaled = others.map((quadrant) => ({
    ...quadrant,
    percent:
      othersTotal === 0
        ? Math.floor(remaining / others.length)
        : Math.floor((quadrant.percent / othersTotal) * remaining),
  }));

  let leftover = remaining - scaled.reduce((sum, quadrant) => sum + quadrant.percent, 0);
  for (let i = 0; leftover > 0; i = (i + 1) % scaled.length) {
    scaled[i].percent += 1;
    leftover -= 1;
  }

  const scaledById = new Map(scaled.map((quadrant) => [quadrant.id, quadrant]));
  return quadrants.map((quadrant) =>
    quadrant.id === id
      ? { ...quadrant, percent: target }
      : (scaledById.get(quadrant.id) ?? quadrant),
  );
}

/**
 * Global store holding the mocked shield grid: each quadrant's energy
 * allocation, current charge, and active/inactive emitter state, plus
 * whether the grid is raised. Shown on the Ops console's Defence view.
 */
export const useShieldsStore = create<ShieldsState>((set) => ({
  quadrants: INITIAL_QUADRANTS,
  raised: false,
  regenerating: false,
  regenSecondsRemaining: 0,
  setAllocation: (id, percent) =>
    set((state) => {
      const quadrant = state.quadrants.find((candidate) => candidate.id === id);
      if (!quadrant?.active) return state;
      return { quadrants: rebalance(state.quadrants, id, percent) };
    }),
  toggleActive: (id) =>
    set((state) => {
      const quadrants = state.quadrants.map((quadrant) =>
        quadrant.id === id ? { ...quadrant, active: !quadrant.active } : quadrant,
      );
      const activeIds = quadrants
        .filter((quadrant) => quadrant.active)
        .map((quadrant) => quadrant.id);
      const split = evenSplit(activeIds);
      return {
        quadrants: quadrants.map((quadrant) => ({ ...quadrant, percent: split[quadrant.id] })),
      };
    }),
  raiseShields: () => set({ raised: true }),
  lowerShields: () => set({ raised: false }),
  regenerateShields: () =>
    set((state) =>
      state.regenerating
        ? state
        : { regenerating: true, regenSecondsRemaining: REGEN_DURATION_SECONDS },
    ),
  tickRegeneration: () =>
    set((state) => {
      if (!state.regenerating) return state;
      const remaining = state.regenSecondsRemaining - 1;
      if (remaining > 0) return { regenSecondsRemaining: remaining };
      return {
        regenerating: false,
        regenSecondsRemaining: 0,
        quadrants: state.quadrants.map((quadrant) => ({
          ...quadrant,
          chargePercent: quadrant.active ? 100 : 0,
        })),
      };
    }),
}));
