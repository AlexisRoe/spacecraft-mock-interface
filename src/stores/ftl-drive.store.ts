import { create } from "zustand";

/** Selectable subspace field coil configuration. */
export type FieldGeometry = "symmetric" | "asymmetric" | "subspace";

/** Shape of the FTL drive state and the actions available to mutate it. */
export interface FtlDriveState {
  /** Matter/antimatter intermix ratio, from 0 to 100. 50 is a balanced 1:1 mix. */
  intermixRatio: number;
  /** Subspace field strength, from 0 to 100. */
  fieldStrength: number;
  /** Active field coil geometry. */
  fieldGeometry: FieldGeometry;
  /** Whether the field coils are currently being flashed (purged and recalibrated). */
  flashingCoils: boolean;
  /** Seconds remaining in the current coil flash cycle. */
  coilFlashSeconds: number;
  /** Number of completed coil flash cycles this session. */
  coilFlashCount: number;
  /** Whether the FTL drive is currently engaged. */
  ftlEngaged: boolean;
  /** Antimatter injector flow rate, from 0 to 100. */
  injectorRate: number;
  /** Sets the intermix ratio, clamped to 0-100. */
  setIntermixRatio: (value: number) => void;
  /** Resets the intermix ratio to a balanced 1:1 mix. */
  balanceIntermix: () => void;
  /** Sets the antimatter injector flow rate, clamped to 0-100. */
  setInjectorRate: (value: number) => void;
  /** Sets the field strength, clamped to 0-100. */
  setFieldStrength: (value: number) => void;
  /** Sets the active field coil geometry. */
  setFieldGeometry: (geometry: FieldGeometry) => void;
  /** Starts a 3-second coil flash cycle, if one isn't already running. */
  startFlashCoils: () => void;
  /** Advances the active coil flash cycle by one second, ending it at zero. */
  tickCoilFlash: () => void;
  /** Toggles whether the FTL drive is engaged. */
  toggleFtlEngaged: () => void;
}

const FLASH_DURATION_SECONDS = 3;

/**
 * Global store holding the mocked FTL (faster-than-light) drive state shown
 * on the Propulsion console's FTL view: the matter/antimatter intermix
 * ratio, subspace field strength and geometry, and the field coil flash
 * cycle.
 */
export const useFtlDriveStore = create<FtlDriveState>((set) => ({
  intermixRatio: 50,
  fieldStrength: 68,
  fieldGeometry: "symmetric",
  flashingCoils: false,
  coilFlashSeconds: 0,
  coilFlashCount: 0,
  ftlEngaged: false,
  injectorRate: 50,
  setIntermixRatio: (value) => set({ intermixRatio: Math.min(100, Math.max(0, value)) }),
  balanceIntermix: () => set({ intermixRatio: 50 }),
  setInjectorRate: (value) => set({ injectorRate: Math.min(100, Math.max(0, value)) }),
  setFieldStrength: (value) => set({ fieldStrength: Math.min(100, Math.max(0, value)) }),
  setFieldGeometry: (geometry) => set({ fieldGeometry: geometry }),
  startFlashCoils: () =>
    set((state) =>
      state.flashingCoils
        ? state
        : { flashingCoils: true, coilFlashSeconds: FLASH_DURATION_SECONDS },
    ),
  tickCoilFlash: () =>
    set((state) => {
      if (!state.flashingCoils) return state;
      const remaining = state.coilFlashSeconds - 1;
      return remaining > 0
        ? { coilFlashSeconds: remaining }
        : {
            flashingCoils: false,
            coilFlashSeconds: 0,
            coilFlashCount: state.coilFlashCount + 1,
          };
    }),
  toggleFtlEngaged: () => set((state) => ({ ftlEngaged: !state.ftlEngaged })),
}));
