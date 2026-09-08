import { create } from "zustand";

/**
 * The seven console views reachable from the nav bar.
 */
export const Views = {
  Navigation: "navigation",
  Ops: "ops",
  Propulsion: "propulsion",
  Communications: "communications",
  Science: "science",
  Data: "data",
  ShipStatus: "ship-status",
} as const;

/**
 * Identifier for one of the seven console views reachable from the nav bar.
 */
export type Views = (typeof Views)[keyof typeof Views];

/**
 * One of the two mutually-exclusive states a console view's header toggle
 * can be in. What each state means (its label and content) is specific to
 * the active view.
 */
export type ViewState = "view-state-a" | "view-state-b";

/**
 * Shape of the navigation state and the actions available to mutate it.
 */
export interface NavigationState {
  /** Currently selected console view. */
  activeView: Views;
  /** Active toggle state of the currently selected view's header switch. */
  viewState: ViewState;
  /** Sets the active console view, resetting its toggle state to "view-state-a". */
  setActiveView: (view: Views) => void;
  /** Sets the active view's header toggle state. */
  setViewState: (viewState: ViewState) => void;
  /** Flips the active view's header toggle state. */
  toggleViewState: () => void;
}

/**
 * Global store holding the currently active console view and the state of
 * its header toggle.
 */
export const useNavigationStore = create<NavigationState>((set) => ({
  activeView: Views.Navigation,
  viewState: "view-state-a",
  setActiveView: (view) => set({ activeView: view, viewState: "view-state-a" }),
  setViewState: (viewState) => set({ viewState }),
  toggleViewState: () =>
    set((state) => ({
      viewState: state.viewState === "view-state-a" ? "view-state-b" : "view-state-a",
    })),
}));
