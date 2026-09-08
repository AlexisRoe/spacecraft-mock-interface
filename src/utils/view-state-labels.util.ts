import { Views } from "../stores/navigation.store";

/** Header toggle labels for one console view's two states. */
export interface ViewStateLabels {
  /** Label for "view-state-a". */
  stateA: string;
  /** Label for "view-state-b". */
  stateB: string;
}

/** Maps each {@link Views} to the labels of its header toggle's two states. */
export const VIEW_STATE_LABELS: Record<Views, ViewStateLabels> = {
  [Views.Navigation]: { stateA: "Automatic", stateB: "Manual" },
  [Views.Ops]: { stateA: "Weapons", stateB: "Defence" },
  [Views.Propulsion]: { stateA: "Conventional", stateB: "FTL" },
  [Views.Communications]: { stateA: "Manual", stateB: "Channels" },
  [Views.Science]: { stateA: "Sensors", stateB: "Props" },
  [Views.Data]: { stateA: "Logs", stateB: "Code" },
  [Views.ShipStatus]: { stateA: "Energy", stateB: "Overview" },
};
