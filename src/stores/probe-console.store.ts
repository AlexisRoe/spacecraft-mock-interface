import { create } from "zustand";
import {
  INITIAL_PROBE_BAYS,
  type ProbeBay,
  type ProbeSweepMode,
} from "../utils/probe-deployment.util";

/** Shape of the probe console state and the actions available to mutate it. */
export interface ProbeConsoleState {
  /** All probe bays and their current deployment state. */
  bays: ProbeBay[];
  /** Id of the bay the control panel (deploy/destroy, sensor sweep) acts on. */
  selectedBayId: string;
  /** Sets which bay the control panel (deploy/destroy, sensor sweep) acts on. */
  selectBay: (id: string) => void;
  /** Releases the probe racked in `id`, marking it deployed. */
  deployProbe: (id: string) => void;
  /** Recalls the probe deployed from `id`, marking it ready again. */
  destroyProbe: (id: string) => void;
  /** Sets the data-sweep mode for the (deployed) probe in `id`. */
  setSweepMode: (id: string, mode: ProbeSweepMode) => void;
}

/** Global store holding the Science view's probe bay roster and controls. */
export const useProbeConsoleStore = create<ProbeConsoleState>((set) => ({
  bays: INITIAL_PROBE_BAYS,
  selectedBayId: INITIAL_PROBE_BAYS[0].id,
  selectBay: (id) => set({ selectedBayId: id }),
  deployProbe: (id) =>
    set((state) => ({
      bays: state.bays.map((bay) => (bay.id === id ? { ...bay, status: "deployed" } : bay)),
    })),
  destroyProbe: (id) =>
    set((state) => ({
      bays: state.bays.map((bay) => (bay.id === id ? { ...bay, status: "ready" } : bay)),
    })),
  setSweepMode: (id, mode) =>
    set((state) => ({
      bays: state.bays.map((bay) => (bay.id === id ? { ...bay, sweepMode: mode } : bay)),
    })),
}));
