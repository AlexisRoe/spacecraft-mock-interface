import type { ComponentType } from "react";
import { NavView } from "../stores/spacecraft.store";
import { CommunicationsView } from "../views/communications.view";
import { DefenceView } from "../views/defence.view";
import { FieldsFtlView } from "../views/fields-ftl.view";
import { FireControlView } from "../views/fire-control.view";
import { LogsView } from "../views/logs.view";
import { NavigationView } from "../views/navigation.view";
import { PropulsionView } from "../views/propulsion.view";
import { ScienceView } from "../views/science.view";
import { ShipStatusView } from "../views/ship-status.view";

/** Maps each {@link NavView} to the component that renders it. */
export const NAV_VIEW_COMPONENTS: Record<NavView, ComponentType> = {
  [NavView.Navigation]: NavigationView,
  [NavView.Propulsion]: PropulsionView,
  [NavView.FieldsFtl]: FieldsFtlView,
  [NavView.Communications]: CommunicationsView,
  [NavView.Defence]: DefenceView,
  [NavView.FireControl]: FireControlView,
  [NavView.ShipStatus]: ShipStatusView,
  [NavView.Science]: ScienceView,
  [NavView.Logs]: LogsView,
};
