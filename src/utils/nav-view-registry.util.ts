import type { ComponentType } from "react";
import { Views } from "../stores/navigation.store";
import { CommunicationsView } from "../views/communications.view";
import { DataConsoleView } from "../views/data.view";
import { NavigationView } from "../views/navigation.view";
import { OpsView } from "../views/ops.view";
import { PropulsionView } from "../views/propulsion.view";
import { ScienceView } from "../views/science.view";
import { ShipStatusView } from "../views/ship-status.view";

/** Maps each {@link Views} to the component that renders it. */
export const NAV_VIEW_COMPONENTS: Record<Views, ComponentType> = {
  [Views.Navigation]: NavigationView,
  [Views.Ops]: OpsView,
  [Views.Propulsion]: PropulsionView,
  [Views.Communications]: CommunicationsView,
  [Views.Science]: ScienceView,
  [Views.Data]: DataConsoleView,
  [Views.ShipStatus]: ShipStatusView,
};
