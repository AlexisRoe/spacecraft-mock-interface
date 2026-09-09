import { create } from "zustand";
import {
  type CommsFilterId,
  getNextScanFrequency,
  MAX_FREQUENCY_MHZ,
  MIN_FREQUENCY_MHZ,
} from "../utils/comms-manual.util";

/** Audio/video output mode for the currently tuned channel. */
export type CommsOutputMode = "audio" | "audio-video";

/** Shape of the Communications console's manual state and the actions available to mutate it. */
export interface CommsManualState {
  /** Whether master audio output is on. */
  isMasterAudioOn: boolean;
  /** Whether the tuned frequency's channel is currently open. */
  isChannelOpen: boolean;
  /** Currently tuned frequency, in MHz. */
  frequencyMhz: number;
  /** Whether the last tuning action was a scanner step, for the scan button's active state. */
  isScanning: boolean;
  /** Whether tuning is held/frozen, blocking further scanning or manual tuning. */
  isHolding: boolean;
  /** Whether video output is active. */
  isVideoActive: boolean;
  /** Selected audio/video output mode. */
  outputMode: CommsOutputMode;
  /** Ids of the currently active signal filters. */
  activeFilters: CommsFilterId[];
  /** Flips whether master audio output is on. */
  toggleMasterAudio: () => void;
  /** Flips whether the tuned frequency's channel is open. */
  toggleChannel: () => void;
  /** Nudges the tuned frequency by `deltaMhz`, clamped to the band; no-ops while holding. */
  tune: (deltaMhz: number) => void;
  /** Sets the tuned frequency directly, clamped to the band; no-ops while holding. */
  setFrequency: (mhz: number) => void;
  /** Steps to the next known external channel frequency; no-ops while holding. */
  scanNext: () => void;
  /** Flips whether tuning is held/frozen. */
  toggleHold: () => void;
  /** Flips whether video output is active. */
  toggleVideo: () => void;
  /** Sets the audio/video output mode. */
  setOutputMode: (mode: CommsOutputMode) => void;
  /** Toggles `id`'s membership in the active filter set. */
  toggleFilter: (id: CommsFilterId) => void;
}

function clampFrequency(mhz: number): number {
  return Math.min(MAX_FREQUENCY_MHZ, Math.max(MIN_FREQUENCY_MHZ, mhz));
}

/** Global store holding the Communications view's manual tuning and audio/video controls. */
export const useCommsManualStore = create<CommsManualState>((set) => ({
  isMasterAudioOn: false,
  isChannelOpen: false,
  frequencyMhz: 121.5,
  isScanning: false,
  isHolding: false,
  isVideoActive: false,
  outputMode: "audio",
  activeFilters: [],
  toggleMasterAudio: () => set((state) => ({ isMasterAudioOn: !state.isMasterAudioOn })),
  toggleChannel: () => set((state) => ({ isChannelOpen: !state.isChannelOpen })),
  tune: (deltaMhz) =>
    set((state) =>
      state.isHolding
        ? state
        : { frequencyMhz: clampFrequency(state.frequencyMhz + deltaMhz), isScanning: false },
    ),
  setFrequency: (mhz) =>
    set((state) =>
      state.isHolding ? state : { frequencyMhz: clampFrequency(mhz), isScanning: false },
    ),
  scanNext: () =>
    set((state) =>
      state.isHolding
        ? state
        : { frequencyMhz: getNextScanFrequency(state.frequencyMhz), isScanning: true },
    ),
  toggleHold: () => set((state) => ({ isHolding: !state.isHolding })),
  toggleVideo: () => set((state) => ({ isVideoActive: !state.isVideoActive })),
  setOutputMode: (mode) => set({ outputMode: mode }),
  toggleFilter: (id) =>
    set((state) => ({
      activeFilters: state.activeFilters.includes(id)
        ? state.activeFilters.filter((filterId) => filterId !== id)
        : [...state.activeFilters, id],
    })),
}));
